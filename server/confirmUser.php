<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header( "Content-type: application/json" );

include_once "constants.php";
include_once 'vendor/autoload.php';	// for Google sign in

//establish sql connection
$conn = new mysqli($SERVER_NAME, $SERVER_USERNAME, $SERVER_PASSWORD);

if ($conn->connect_error) {
    die("<br /><b>Connection failed!!! Please email jmager@mtu.edu</b> <br /> " . $conn->connect_error);
}

mysqli_select_db($conn,"mtuFishingClub");

// Check in coming parameters
// 		paramters: id_token
$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
if ($contentType == "application/json") {
	
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));
  $decoded = json_decode($content, true);

  //If json_decode failed, the JSON is invalid.
  if (is_array($decoded)) {
	$id_token = $decoded["id_token"];
  } else {
	// Send error back to user.
    $jsonAnswer = array('data' => 'false');
	echo json_encode($jsonAnswer);
	return;
  }
} else {
	$jsonAnswer = array('data' => 'no json');
	echo json_encode($jsonAnswer);
	return;
}

$client = new Google_Client(['client_id' => $CLIENT_ID]);
$payload = $client->verifyIdToken($id_token);

if ($payload) {
	  $userid = $payload['sub'];
	
	  // If not authorized google account
	  if ($payload['iss'] != 'accounts.google.com' || $payload['aud'] != $CLIENT_ID) {
		$jsonAnswer = array('test' => ' fuck off m8');
		echo json_encode($jsonAnswer);
		return;
	  }

	  // Return account to client
	  echo json_encode($payload);
} else {
  // Invalid ID token
  $jsonAnswer = array('test' => ' fuck off m8');
  echo json_encode($jsonAnswer);

}


?>
