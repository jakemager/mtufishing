<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$users = array();

	// Find user in DB
	$getUsers = "SELECT * FROM Users WHERE position != 'Member' && position != 'Alumni'";
	$userResults = $conn->query($getUsers);

	if ($userResults->num_rows > 0) {
		while($info = $userResults->fetch_assoc()) {
			$user = new stdClass();
			$user->name = $info['name'];
			$user->position = $info['position'];

			array_push($users, $user);
		}

		echo json_encode($users);
	}
?>