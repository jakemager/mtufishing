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

	function generateRandomString($length = 10) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}
?>
