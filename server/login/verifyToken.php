<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	// Get incoming payload
	$accessToken = $_POST['accessToken'] ?? null;

	if ($accessToken == null) {
		header("HTTP/1.1 500 Internal Server Error");
		echo json_encode(false);
	} 

	// Check if token exist in DB
	$getToken = "SELECT * FROM Tokens WHERE accessToken='". $accessToken ."'";
	$tokenResults = $conn->query($getToken);
	if ($tokenResults->num_rows < 1) {
		echo json_encode(true);
	}
	
?>