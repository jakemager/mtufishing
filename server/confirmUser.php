<?php
//establish sql connection
$servername = "localhost:8889";
$username = "root";
$password = "root";
// $servername = "jakemager.com";
// $username = "jakemager";
// $password = "4ducksUn71m1t3d12";
$conn = new mysqli($servername, $username, $password);
//$db = new PDO($servername, $username, $password);
if ($conn->connect_error) {
    die("<br /><b>Connection failed!!! Please email jmager@mtu.edu</b> <br /> " . $conn->connect_error);
}


$CLIENT_ID = '1073431930974-srjpg96sqchee583e8ol15cvgf4r804e.apps.googleusercontent.com';


mysqli_select_db($conn,"mtuFishingClub");

include_once 'vendor/autoload.php';

// Get $id_token via HTTPS POST.
// $id_token =  $_POST["id_token"];

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

header( "Content-type: application/json" );


if ($contentType === "application/json") {
  //Receive the RAW post data.
  $content = trim(file_get_contents("php://input"));

  $decoded = json_decode($content, true);

  //If json_decode failed, the JSON is invalid.
  if(is_array($decoded)) {
	$id_token = $decoded["id_token"];
  } else {
	// Send error back to user.
  	// If request specified a G Suite domain:
  	//$domain = $payload['hd'];

    $jsonAnswer = array('test' => 'false');
	echo json_encode($jsonAnswer);
	return;
  }
} else {
    $jsonAnswer = array('test' => 'NOT JSON');
	echo json_encode($jsonAnswer);
	return;
}



$client = new Google_Client(['client_id' => $CLIENT_ID]);  // Specify the CLIENT_ID of the app that accesses the backend
$payload = $client->verifyIdToken($id_token);
if ($payload) {
  	$userid = $payload['sub'];
  	// If request specified a G Suite domain:
	  //$domain = $payload['hd'];
	  if ($payload['iss'] != 'accounts.google.com' || $payload['aud'] != $CLIENT_ID) {
		$jsonAnswer = array('test' => ' fuck off m8');
		echo json_encode($jsonAnswer);
		return;
	  }


	  $jsonAnswer = array('test' => 'OH YES OH YES');

	  echo json_encode($payload);
} else {
  // Invalid ID token
  $jsonAnswer = array('test' => ' fuck off m8');
  echo json_encode($jsonAnswer);

}


?>
