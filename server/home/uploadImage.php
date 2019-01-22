<?php
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header( "Content-type: application/json" );
	
	include_once "../constants.php";

	function convertImage($originalImage, $outputImage, $quality)
	{
		// jpg, png, gif or bmp?
		$exploded = explode('.',$originalImage);
		$ext = $exploded[count($exploded) - 1]; 
	
		if (preg_match('/jpg|jpeg/i',$ext))
			$imageTmp=imagecreatefromjpeg($originalImage);
		else if (preg_match('/png/i',$ext))
			$imageTmp=imagecreatefrompng($originalImage);
		else if (preg_match('/gif/i',$ext))
			$imageTmp=imagecreatefromgif($originalImage);
		else if (preg_match('/bmp/i',$ext))
			$imageTmp=imagecreatefrombmp($originalImage);
		else
			return 0;
	
		// quality is a value from 0 (worst) to 100 (best)
		imagejpeg($imageTmp, $outputImage, $quality);
		imagedestroy($imageTmp);
	
		return 1;
	}

	// Get parameters
	$type = $_POST['type'];
	$image = $_FILES["image"];
	$newImage = null;


	$target_dir = "images/";
	$temp = explode(".", $image["name"]);
	$newfilename = $type . '.jpeg';
	$target_file = $target_dir . basename($newfilename); 
	$uploadOk = 1;
	$imageFileType = end($temp);

	if (!is_dir($target_dir) || !is_writable($target_dir)) {
		echo 'Upload directory is not writable, or does not exist.';
		return;
	}

	// Check if image file is a actual image or fake image
	$check = getimagesize($image["tmp_name"]);
	if($check !== false) {
		$uploadOk = 1;
	} else {
		echo "File is not an image.";
		$uploadOk = 0;
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
	&& $imageFileType != "gif" && $imageFileType != 'bmp' ) {
		echo "Only JPG, JPEG, PNG & GIF files are allowed.";
		$uploadOk = 0;
	}

	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) {
		return json_encode(array(
			'status' => '400', // success or not?
			'message' => "Error"
			));
	// if everything is ok, try to convert and upload file
	} else {


		$imageTmp = null;

		if ($imageFileType == 'jpg' || $imageFileType == 'jpeg')
			$imageTmp=imagecreatefromjpeg($image['tmp_name']);
		else if ($imageFileType == 'png')
			$imageTmp=imagecreatefrompng($image['tmp_name']);
		else if ($imageFileType == 'gif')
			$imageTmp=imagecreatefromgif($image['tmp_name']);
		else if ($imageFileType == 'bmp')
			$imageTmp=imagecreatefrombmp($image['tmp_name']);
		else
			return 0;

		if (!imagejpeg($imageTmp, $target_file, 80)) {
			echo "Sorry, there was an error uploading your file.";
			echo $newImage["error"];
		} else {
			echo json_encode(true);
		}

		imagedestroy($imageTmp);

	}
?>
