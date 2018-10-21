<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$today = date("Y-m-d");
	$sql = "UPDATE LockerRoomLogs SET returnedTo = '". $_POST['user'] ."', dateReturned = '". $today ."' WHERE ID = " . $_POST['logId'] . ";\n";
	$sql .= "UPDATE LockerRoomItems SET quantityAvailable = quantityAvailable + 1 WHERE ID = " . $_POST['itemId'] . ";";
  
	if (mysqli_multi_query($conn, $sql)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
