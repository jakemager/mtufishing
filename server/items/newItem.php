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

	$sql = '';
	

	$sql .= "INSERT INTO `LockerRoomItems` (`ID`, `name`, `quantity`, `quantityAvailable`, `description`, `image`)
	VALUES(NULL, '" . $item['name'] . "', '" . (int)$item['quantity'] . "', '" . (int)$item['quantity'] . "', '" . $item['description'] . "', '" . $image . "');\n";

	if (mysqli_query($conn, $sql)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
