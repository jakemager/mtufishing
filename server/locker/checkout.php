<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$items = json_decode($_POST['items'], true);

	$sqlLog = '';
	$sqlRemove = '';

	foreach ($items as $item) {
		for ($x = 0; $x < $item['quantity']; $x++) {
			$sqlLog .= "INSERT INTO `LockerRoomLogs` (`ID`, `itemID`, `user`, `approver`, `dateCheckedOut`, `dateToReturn`, `dateReturned`, `returnedTo`)
			VALUES(NULL, '" . $item['Id'] . "', '" . $_POST['studentId'] . "', NULL, '" . $_POST['checkoutDate'] . "', '" . $_POST['returnDate'] . "', NULL, NULL);\n";
		} 	
	
	}

	if (mysqli_multi_query($conn,$sqlLog)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
