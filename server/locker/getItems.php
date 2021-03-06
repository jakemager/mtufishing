<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$items = array();

	// Find user in DB
	$getItems = "SELECT * FROM LockerRoomItems";
	$itemResults = $conn->query($getItems);

	if ($itemResults->num_rows > 0) {
		while($info = $itemResults->fetch_assoc()) {
			$item = new stdClass();
			$item->Id = $info['ID'];
			$item->name = $info['name'];
			$item->quantity = $info['quantity'];
			$item->quantityAvailable = $info['quantityAvailable'];
			$item->description = $info['description'];
			$item->image = $info['image'];

			array_push($items, $item);
		}

		echo json_encode($items);
	}
?>