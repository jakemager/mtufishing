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
// 		parameters: id_token
$id_token = $_POST['id_token'] ?? null;

if ($id_token === null) {
	header("HTTP/1.1 500 Internal Server Error");
	return;
}

$client = new Google_Client(['client_id' => $CLIENT_ID]);
$payload = $client->verifyIdToken($id_token);

if ($payload) {
	  $userid = $payload['sub'];
	
	  // If not authorized google account
	  if ($payload['iss'] != 'accounts.google.com' || $payload['aud'] != $CLIENT_ID) {
		echo "Invalid Login";
		return;
	  }

	  // Return account to client
	  echo $payload['name'];
} else {
  // Invalid ID token
  echo "Invalid Login";
}


?>