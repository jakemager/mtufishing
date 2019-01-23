<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	$item = json_decode($_POST['item'], true);
	$updatedImage = json_decode($_POST['updatedImage'], true);
	$image = $_FILES["image"];


	if ($updatedImage && !isset($_FILES["image"])) {
		$newfilename = 'no-img.jpg';
	} else if ($updatedImage) {
		$target_dir = "images/";
		$temp = explode(".", $image["name"]);
		$newfilename = generateRandomString() . '.' . end($temp);
		$target_file = $target_dir . basename($newfilename); 
		$uploadOk = 1;
		$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
		
		if (!is_dir($target_dir) || !is_writable($target_dir)) {
			echo 'Upload directory is not writable, or does not exist.';
			return;
		}

		// Check if image file is a actual image or fake image
		if(isset($_POST["submit"])) {
			$check = getimagesize($image["tmp_name"]);
			if($check !== false) {
				echo "File is an image - " . $check["mime"] . ".<br />";
				$uploadOk = 1;
			} else {
				echo "File is not an image.";
				$uploadOk = 0;
			}
		}
		// Check file size
		if ($image["size"] > 5 * 1024 * 1024) {
			echo json_encode(array(
				'status' => '400', // success or not?
				'message' => "File too large"
				));
			$uploadOk = 0;
		}
		// Allow certain file formats
		if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
		&& $imageFileType != "gif" ) {
			echo "<br />Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
			$uploadOk = 0;
		}

		// Check if file already exists
		while (file_exists($target_file)) {
			$newfilename = generateRandomString() . '.' . end($temp);
			$target_file = $target_dir . basename($newfilename); 
		}
		
		// Check if $uploadOk is set to 0 by an error
		if ($uploadOk == 0) {
			return json_encode(array(
				'status' => '400', // success or not?
				'message' => "Error"
				));
		// if everything is ok, try to upload file
		} else {
			if (!move_uploaded_file($image["tmp_name"], $target_file)) {
				echo "Sorry, there was an error uploading your file.";
				echo $image["error"];
				return;
			}
		}

	} else {
		$newfilename = $item['image'];
	}


	if (strlen($image) == 0) {
		$image = 'no-img.jpg';
	}

	$getItem = "SELECT quantityAvailable, quantity FROM LockerRoomItems WHERE ID = " . $item['id'] . ";";
	$itemResults = $conn->query($getItem);
	if ($itemResults->num_rows > 0) {
		$info = $itemResults->fetch_assoc();

		if ($result = mysqli_query($conn,  "SELECT * FROM LockerRoomLogs WHERE itemID = " . $item['id'] . " AND dateReturned IS NULL")) {
			$amountCheckedOut = mysqli_num_rows($result);
			mysqli_free_result($result);
		}

		$newQuantityAvaliable = $item['quantity'] - $amountCheckedOut;

		$sql = "UPDATE LockerRoomItems SET name = '" . $item['name'] . "', quantityAvailable = '" . (int)$newQuantityAvaliable. "', quantity = '" . (int)$item['quantity'] . "', image = '" . $newfilename . "'
			WHERE ID = " . $item['id'] . ";";
	
		if (mysqli_query($conn, $sql)) {
				echo json_encode(true);
	
		} else echo json_encode($conn->error);


	}




?>
