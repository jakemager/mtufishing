<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$sponsors = array();

	$getSponsors = "SELECT * FROM Sponsors";
	$sponsorResults = $conn->query($getSponsors);

	if ($sponsorResults->num_rows > 0) {
		while($info = $sponsorResults->fetch_assoc()) {
			$sponsor = new stdClass();
			$sponsor->name = $info['name'];
			$sponsor->website = $info['website'];
			$sponsor->image = $info['image'];

			array_push($sponsors, $sponsor);
		}

		echo json_encode($sponsors);
	}
?>