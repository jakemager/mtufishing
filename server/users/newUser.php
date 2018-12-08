<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$user = json_decode($_POST['user'], true);

	$admin = 0;
	$boat = 0;
	$paid = 0;

	if ($user['admin']) $admin = 1;
	if ($user['boat']) $boat = 1;
	if ($user['paid']) $paid = 1;

	$sql .= "INSERT INTO `Users` (`ID`, `name`, `position`, `paid`, `admin`, `boatPrivilges`)
	VALUES('" . $user['id'] . "', '" . $user['name'] . "', '" . $user['position'] . "', '" . $paid . "', '" . $admin . "', '" . $boat . "');\n";

	if (mysqli_query($conn, $sql)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
