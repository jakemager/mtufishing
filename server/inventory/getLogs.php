<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$logs = array();

	// Find user in DB
	$getLogs = "SELECT A.ID AS logID, approver, returnedTo, dateReturned, dateCheckedOut,dateToReturn, B.ID AS itemID, user, name
					FROM LockerRoomLogs A
					JOIN LockerRoomItems B ON A.itemID = B.ID
					ORDER BY A.dateCheckedOut ASC";
	$logResults = $conn->query($getLogs);

	if ($logResults->num_rows > 0) {
		while($info = $logResults->fetch_assoc()) {
			$item = new stdClass();
			$item->Id = $info['logID'];
			$item->itemId = $info['itemID'];
			$item->itemName = $info['name'];
			$item->user = $info['user'];
			$item->approver = $info['approver'];
			$item->checkoutDate = $info['dateCheckedOut'];
			$item->returnDate = $info['dateToReturn'];
			$item->dateReturned = $info['dateReturned'];
			$item->returnedTo = $info['returnedTo'];

			array_push($logs, $item);
		}

		echo json_encode($logs);
	}
?>