<?php
	$CLIENT_ID = '1073431930974-rse6ic0teqt7jd401secn08m3ovdsf4l.apps.googleusercontent.com';
	$SERVER_NAME = "localhost:8889";
	$SERVER_USERNAME = "root";
	$SERVER_PASSWORD = "root";

	//establish sql connection
	$conn = new mysqli($SERVER_NAME, $SERVER_USERNAME, $SERVER_PASSWORD);
	if ($conn->connect_error) {
		die("<br /><b>Connection failed!!! Please email jmager@mtu.edu</b> <br /> " . $conn->connect_error);
	}
	mysqli_select_db($conn,"mtuFishingClub");

	// $SERVER_NAME = "jakemager.com";
	// $SERVER_USERNAME = "jakemager";
	// $SERVER_PASSWORD = "4ducksUn71m1t3d12";
?>