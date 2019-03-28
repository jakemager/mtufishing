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


	// Find equipment manager
	$getUsers = "SELECT * FROM Users WHERE position = 'Equipment Manager'";
	$userResults = $conn->query($getUsers);

	$equipmentManger = null;

	if ($userResults->num_rows > 0) {
		while($info = $userResults->fetch_assoc()) {
			$equipmentManger = $info['ID'] . '@mtu.edu';
		}

		$subject = 'MTU Fishing Locker Checkout Request';
		$message = 'There is a request from ' . $_POST['studentId'] . ' to checkout equipment.';
		$headers = 'From: ' . $_POST['studentId'] . '@mtu.edu';
		
		mail($equipmentManger, $subject, $message, $headers);
	}




	if (mysqli_multi_query($conn,$sqlLog)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
