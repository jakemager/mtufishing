<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$sponsor = json_decode($_POST['sponsor'], true);
	$image = $sponsor['image'];

	if (strlen($image) == 0) {
		$image = 'no-img.jpg';
	}

	$sql = "UPDATE Sponsors SET name = '" . $sponsor['name'] . "', website = '" . $sponsor['website'] . "', image = '" . $image . "'
		WHERE ID = " . $sponsor['id'] . ";";

	if (mysqli_query($conn, $sql)) {
			echo json_encode(true);

	} else echo json_encode($conn->error);

	
?>