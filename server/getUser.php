<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "constants.php";

	// Get incoming payload
	$accessToken = $_POST['accessToken'] ?? null;
	$userId = $_POST['userId'] ?? null;

	if ($userId == null || $accessToken == null) {
		header("HTTP/1.1 500 Internal Server Error");
		return;
	} 

	// Check if token exist in DB
	$getToken = "SELECT * FROM Tokens WHERE accessToken='". $accessToken ."'";
	$tokenResults = $conn->query($getToken);
	if ($tokenResults->num_rows < 1) {
		return;
	}

	$userObject = new stdClass();

	// Find user in DB
	$getStudents = "SELECT * FROM Users WHERE ID='". $userId ."'";
	$studentResults = $conn->query($getStudents);
	if ($studentResults->num_rows > 0) {
		while($info = $studentResults->fetch_assoc()) {
			$userObject->name = $info['name'];
			$userObject->userId = $userId;
			$userObject->admin  = $info['admin'] == 1 ? true : false;
		}

		echo json_encode($userObject);
	}
?>