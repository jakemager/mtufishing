<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$user = json_decode($_POST['user'], true);

	$admin = 0;
	$boat = 0;
	$paid = 0;

	if ($user['admin'] == true) $admin = 1;
	if ($user['boat'] == true) $boat = 1;
	if ($user['paid'] == true) $paid = 1;
	

	$sql = "UPDATE Users SET name = '" . $user['name'] . "',
		position = '" . $user['position'] . "', paid = '" . $paid  . "',
		boatPrivilges = '" . $boat . "', admin = '" . $admin  . "'
		WHERE ID = '" . $user['id'] . "';";

	if (mysqli_query($conn, $sql)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


	
?>
