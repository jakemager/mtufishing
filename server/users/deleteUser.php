<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$sqlLog = "DELETE FROM Users WHERE ID = '" . $_POST['id'] . "';\n";

	if (mysqli_multi_query($conn,$sqlLog)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);


?>
