<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header( "Content-type: application/json" );

include_once "../constants.php";
include_once 'vendor/autoload.php';	// for Google sign in

// Get incoming payload
$idToken = $_POST['idToken'] ?? null;
$accessToken = $_POST['accessToken'] ?? null;
$expiresAtMs = $_POST['expiresAt'] ?? null;

if ($idToken == null || $accessToken == null || expiresAt == null) {
	header("HTTP/1.1 500 Internal Server Error");
	return;
} 

// Convert ms to datetime
$expiresAt = date("Y-m-d H:i:s", $expiresAtMs / 1000);


$client = new Google_Client(['client_id' => $CLIENT_ID]);
$payload = $client->verifyIdToken($idToken);

if ($payload) {
	
	// If not authorized google account
	if ($payload['iss'] != 'accounts.google.com' || $payload['aud'] != $CLIENT_ID) {
		header("HTTP/1.1 403 Access Denied");
		return;
	}

	$userObject = new stdClass();

	$studentId = substr($payload['email'], 0, -8);
	$getStudents = "SELECT * FROM Users WHERE ID='". $studentId ."'";
	$studentResults = $conn->query($getStudents);
	if ($studentResults->num_rows > 0) {
		while($info = $studentResults->fetch_assoc()) {
			$userObject->name = $info['name'];
			$userObject->userId = $studentId;
			$userObject->admin  = $info['admin'];
		}

		$newToken = "INSERT INTO  `Tokens` (`ID`, `accessToken`, `idToken`, `expiresAt`)
			VALUES (NULL, '" . $accessToken . "', '" . $idToken . "', '$expiresAt')";

		if ($conn->query($newToken)) {
			echo json_encode($userObject);
		}
		
		echo $conn->error;

	} else {
		header("HTTP/1.1 403 Access Denied");
		return;
	}

} else {
  	// Invalid ID token
  	header("HTTP/1.1 403 Access Denied");
	return;
}

?>