<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$item = json_decode($_POST['item'], true);
	$image = $item['image'];

	if (strlen($image) == 0) {
		$image = 'no-img.jpg';
	}

	$getItem = "SELECT quantityAvailable, quantity FROM LockerRoomItems WHERE ID = " . $item['id'] . ";";
	$itemResults = $conn->query($getItem);
	if ($itemResults->num_rows > 0) {
		$info = $itemResults->fetch_assoc();

		$amountCheckedOut = $info['quantity'] - $info['quantityAvaliable'];
		$newQuantityAvaliable = $item['quantity'] - $amountCheckedOut;

		$sql = "UPDATE LockerRoomItems SET name = '" . $item['name'] . "', quantityAvailable = '" . (int)$newQuantityAvaliable. "', quantity = '" . (int)$item['quantity'] . "', image = '" . $image . "'
			WHERE ID = " . $item['id'] . ";";
	
		if (mysqli_query($conn, $sql)) {
				echo json_encode(true);
	
		} else echo json_encode($conn->error);


	}




?>
