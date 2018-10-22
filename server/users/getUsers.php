<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$users = array();

	// Find user in DB
	$getUsers = "SELECT * FROM Users";
	$itemResults = $conn->query($getUsers);

	if ($itemResults->num_rows > 0) {
		while($info = $itemResults->fetch_assoc()) {
			$item = new stdClass();
			$item->Id = $info['ID'];
			$item->name = $info['name'];
			$item->position = $info['position'];
			$item->paid = $info['paid'];
			$item->admin = $info['admin'];
			$item->boatPrivilges = $info['boatPrivilges'];

			array_push($users, $item);
		}

		echo json_encode($users);
	}
?>