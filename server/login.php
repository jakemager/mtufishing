<?php
session_start();
include_once "confirmUser.php";
?>

<!DOCTYPE html>
<html>
<head>
	<title>The Fishing Club at Michigan Tech</title>
	<link rel="stylesheet" href="style/login.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="dropzone.js"></script>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="dropzone.css">

	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.css"/>
	<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/datatables.min.js"></script>

	<style>
		html,
		body {
    height: 100%;
		}
		.newUserStyle {
			background-color: #CCCCCC;
			border-radius: 5%;
			padding: 30px 0px 40px 0px;
			border: solid black 2px;
		}

		.manageInventoryStyle {
			background-color: #CCCCCC;
			border-radius: 2%;
			padding: 30px 0px 40px 0px;
			border: solid black 2px;
			overflow-x: auto;
		}

		.container {
	    height: 100%;
			text-align: center;
			align-items: center;
		}

		.input-group[class*="col-"] {
    padding-right: 15px;
    padding-left: 15px;
		}

		.tableHeader {
			color: black;
			font-weight: bold;
			font-size: 125%;
			float: left;
			margin-left: 5px;
		}

		.buttonStyle {
			margin: 4px 0px 2px 0px;
		}

		#dropzone {
			width:100%;
		}

	</style>
	<script>

	//TODO: add a function to hide everything to eliminate redundent code



	function deleteImage() {
		var request = $.ajax({
			type: 'POST',
			url: "deleteImage.php",
			dataType:'json',
			data: ({ imageName : location.hash.substring(8) })
		});

		request.done(function(data) {
			if (!data.error) {
				document.getElementById(location.hash.substring(8)).innerHTML = "DELETED";
			} else {
				document.getElementById(location.hash.substring(8)).innerHTML = "ERROR, please try again!";
			}
		});

	}

	function newUserSubmit() {
		if ($('#fname')[0].value.length <= 0) {
			alert("FAIL: First Name not entered");
			return;
		}
		else if ($('#lname')[0].value.length <= 0) {
			alert("FAIL: Last Name not entered");
			return;
		}
		else if ($('#username')[0].value.length <= 0) {
			alert("FAIL: Email not entered");
			return;
		}

		$('#successfullyAddedUser').value = '';

		var name = $('#fname')[0].value + " " + $('#lname')[0].value;
		var username = $('#username')[0].value;
		var position = $('#position')[0].value;
		var paid = $('#paid')[0].checked;
		var admin = $('#admin')[0].checked;
		var boatPrivilges = $('#boatPrivilges')[0].checked;

		paid ? (paid=1) : (paid=0);
		admin ? (admin=1) : (admin=0);
		boatPrivilges ? (boatPrivilges=1) : (boatPrivilges=0);
		var request = $.ajax({
			type: 'POST',
			url: "newUser.php",
			 data: {
			 	name : name, username : username, position : position, paid : paid, admin : admin, boatPrivilges: boatPrivilges
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (!data.error) {
				$('#successfullyAddedUser').value = 'Added User!';
				$('#fname')[0].value = '';
				$('#lname')[0].value = ''
				$('#username')[0].value = '';
				$('#position')[0].value = 'Member';
				$('#paid')[0].checked = false;
				$('#admin')[0].checked = false;
				$('#boatPrivilges')[0].checked = false;

			} else {
				alert("ERROR");
			}
		});

	}

	function manageImages(show) {
		if (show) {
			var request = $.ajax({
				url: "loadUserImages.php",
				dataType: "html"
			});
			request.done(function(msg) {
				//$("#manageImages").html( msg + "<br /><a onclick='manageImages(false)'>Hide images</a>" );
				$("#manageImages").html(msg);
				$("#manageImages").css('display', 'block');
				//$("#manageImagesHref").css('display', 'none');
			});
		}
		else {
			//document.getElementById("manageImages").innerHTML = "<a id='manageImagesHref' onclick='manageImages(true)'>Manage your images</a>";
		}
		$("#manageImages").slideToggle();

	}

	// no permissions set!!!!
	function newUser(show) {
		if (show) {
			document.getElementById("manageImages").innerHTML = "<a id='manageImagesHref' onclick='manageImages(true)'>Manage your images</a>";
			$("#newUser").slideToggle();

		}
	}

	function hideUsernameInputAddon() {
		$("#usernameInputAddon").fadeOut();
	}

	function manageInventory(show) {
		$("#manageInventory").slideToggle();
	}

	function manageUsers() {
		$("#manageUsers").slideToggle();
	}

	function manageItems() {
		$("#manageItems").slideToggle();
	}

	function showHistory() {
		$("#historyTable").slideToggle();
	}

	function deleteItem(logID, itemID) {
		var request = $.ajax({
			type: 'POST',
			url: "deleteItemCheckout.php",
			 data: {
				logID : logID,
				itemID : itemID
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (!data.error) {
				document.getElementById('log'+logID).innerHTML = "<center>Deleted</center>";
			} else {
				alert("ERROR");
			}
		});
	}

	function approveItem(logID) {
		var request = $.ajax({
			type: 'POST',
			url: "approveCheckout.php",
			 data: {
				logID : logID,
				user: user
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (!data.error) {
				document.getElementById('log'+logID).innerHTML = "<center>APPROVED</center>";
			} else {
				alert("ERROR");
			}
		});
	}

	function returnItem(logID, itemID) {
		var request = $.ajax({
			type: 'POST',
			url: "returnCheckout.php",
			 data: {
				logID : logID,
				itemID: itemID,
				user: user
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (!data.error) {
				document.getElementById('log'+logID).innerHTML = "<center>Returned</center>";
			} else {
				alert("ERROR");
			}
		});
	}

	function changeName(ID) {
		var name = document.getElementById("name_" + ID).value;
		if (name.length > 0) {
			document.getElementById("name_" + ID).parentElement.innerHTML = "<p id='name_"+ ID +"'onclick='makeTextbox(\""+ ID +"\",\""+ name +"\")'>"+ name +"</p>";

			var request = $.ajax({
				type: 'POST',
				url: "updateUser.php",
				 data: {
					userID : ID,
					newData: name,
					colName: "name"
				 },
				error: function(xhr, status, error) {
					alert(xhr + "\n" + error + "\n" + status);
				}
			});

			request.done(function(data) {
				if (data.error) {
					alert("An error has occured");
				}
			});

		} else {
			document.getElementById("name_" + ID).parentElement.innerHTML = document.getElementById("name_" + ID).placeholder;
		}
	}

	function updatePosition(ID) {
		var position = document.getElementById("pos_" + ID).value;
		var request = $.ajax({
			type: 'POST',
			url: "updateUser.php",
			 data: {
				userID : ID,
				newData: position,
				colName: "position"
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (data.error) {
				alert("An error has occured");
			}
		});
	}

	function updateUser(ID, type, value) {
		var request = $.ajax({
			type: 'POST',
			url: "updateUser.php",
			 data: {
				userID : ID,
				newData: value,
				colName: type
			 },
			error: function(xhr, status, error) {
				alert(xhr + "\n" + error + "\n" + status);
			}
		});

		request.done(function(data) {
			if (data.error) {
				alert("An error has occured");
			}
		});
	}


	function makeTextbox(ID, name) {
		document.getElementById("name_" + ID).parentElement.innerHTML = "<input id='name_"+ ID +"' onfocusout='changeName(\""+ ID +"\")' type='text' placeholder='" + name + "' autofocus />";
	}

	$(document).ready(function(){
	    $('[data-toggle="tooltip"]').tooltip();

			$('#manageUsersTable').DataTable( {
			    "pagingType": "full_numbers"
			} );


	});
	</script>
</head>
<body>
	<header class="page-heading col-xs-* col-sm-4 col-sm-offset-4">
		<img src='images/logo.png' width='100%'/><br />
	</header>
	<div class="container col-xs-* col-sm-6 col-sm-offset-3">
	<?php
	if (isset($_SESSION['name'])) {
		echo "<br />Welcome ". $_SESSION['name'];
	?>
			<br /><br />
			<button class="buttonStyle" onclick="location.href = 'lockerRoom.php';">Locker</button>
			<br /><br />
			Upload photos:
			<br /><form action="upload.php" id="dropzone" class="dropzone"></form>
			<br />
			<button class="buttonStyle"  onclick="manageImages(true)">Manage your images</button>
			<div id='manageImages' style="display:none;">
			</div>
			<br />

			<?php
			if ($_SESSION['admin']) {
			?>
				<button class="buttonStyle" onclick="newUser(true)">Add new user</button>
				<div id='newUser' style="display:none;">
					<p id ='successfullyAddedUser'></p>
					<div class="newUserStyle form-horizontal col-xs-* col-sm-10 col-sm-offset-1">
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">First Name</label>
						    <div class="col-xs-6 col-sm-7">
									<input class="form-control" type='text' id='fname' placeholder="Enter First Name"></input>
						    </div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Last Name</label>
						    <div class="col-xs-6 col-sm-7">
									<input class="form-control" type='text' id='lname' placeholder="Enter Last Name"></input>
						    </div>
							</div>
							<div class="form-group with-input-group">
								<label class="col-xs-5 col-sm-4 control-label">Email</label>
								<div class="input-group col-xs-6 col-sm-7">
										<input class="form-control" type='text' onclick="hideUsernameInputAddon();" placeholder="Enter Username" id='username'></input>
										<span id='usernameInputAddon' class="input-group-addon">@mtu.edu</span>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Position</label>
						    <div class="col-xs-6 col-sm-7">
									<select id='position' class='selectpicker col-xs-12'>
										<option value='Member'>Member</option>
										<option value='President'>President</option>
										<option value='Vice President'>Vice President</option>
										<option value='Treasurer'>Treasurer</option>
										<option value='Secretary'>Secretary</option>
										<option value='Sponsorship'>Sponsorship</option>
										<option value='Public Relations'>Public Relations</option>
										<option value='Equipment Manager'>Equipment Manager</option>
										<option value='Trip Coordinator'>Trip Coordinator</option>
										<option value='Alumni'>Alumni</option>
									</select>
						    </div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Paid</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='paid'></input>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Admin</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='admin'></input>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Boat Privilges</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='boatPrivilges'></input>
								</div>
							</div>
							<div class="col-xs-12">
								<button class="btn btn-primary" onclick="newUserSubmit()">Submit</button>
							</div>
						</div>
				</div>
				<br />
				<button class="buttonStyle" onclick="manageUsers()"> Manage Users </button>
				<div id='manageUsers' class='manageInventoryStyle' style='display:none'>
					<?php
						$sqlUsers = "SELECT * FROM Users";
						$result = $conn->query($sqlUsers);
						if ($result->num_rows > 0) {
							echo "<table id='manageUsersTable' class='display stripe'>
										<thead>
											<tr>
												<th>ID</th>
												<th>Name</th>
												<th>Position</th>
												<th>Paid</th>
												<th>Admin</th>
												<th>Boat</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
							";
							while($item = $result->fetch_assoc()) {
								echo "<tr>
												<td>". $item['ID'] . "</td>
												<td><p id='name_". $item['ID'] ."' onclick='makeTextbox(\"". $item['ID'] ."\",\"". $item['name'] ."\")'>". $item['name'] . "</p></td>
												<td>
												<select id='pos_". $item['ID'] ."' onchange='updatePosition(\"". $item['ID'] ."\",\"". $item['name'] ."\")' class='selectpicker col-xs-12'>
													<option value='". $item['position'] . "'>". $item['position'] . "</option>
													<option value='Member'>Member</option>
													<option value='President'>President</option>
													<option value='Vice President'>Vice President</option>
													<option value='Treasurer'>Treasurer</option>
													<option value='Secretary'>Secretary</option>
													<option value='Sponsorship'>Sponsorship</option>
													<option value='Public Relations'>Public Relations</option>
													<option value='Equipment Manager'>Equipment Manager</option>
													<option value='Trip Coordinator'>Trip Coordinator</option>
													<option value='Alumni'>Alumni</option>
												</select></td>";
												if ($item['paid']) {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"paid\", 0)' type='checkbox' checked></td>";
												} else {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"paid\", 1)' type='checkbox' ></td>";
												}
												if ($item['admin']) {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"admin\", 0)' type='checkbox' checked></td>";
												} else {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"admin\", 1)' type='checkbox' ></td>";
												}
												if ($item['boatPrivilges']) {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"boatPrivilges\", 0)' type='checkbox' checked></td>";
												} else {
													echo "<td><input onclick='updateUser(\"". $item['ID'] ."\", \"boatPrivilges\", 1)' type='checkbox' ></td>";
												}
											echo "<td><button onclick='updateUser(\"". $item['ID'] ."\", \"delete\")'>X</button></td>
											</tr>";
							}
							echo "</tbody></table>";
						}
					?>
				</div>

				<br />
				<button class="buttonStyle" onclick="manageInventory()"> Manage Inventory </button>
				<div id='manageInventory' class="manageInventoryStyle" style="display:none">
					<?php

						// load pending items
						$sqlPending = "SELECT A.ID AS logID, B.ID AS itemID, dateToReturn, dateCheckedOut, user, name
														FROM LockerRoomLogs A
														JOIN LockerRoomItems B ON A.itemID = B.ID
														WHERE A.approver IS NULL
														ORDER BY A.dateCheckedOut ASC ";
						$resultPending = $conn->query($sqlPending);
						if ($resultPending->num_rows > 0) {
							echo "<p class='tableHeader'>Pending</p>";
							echo "<table class='table table-striped'>
										<tr>
											<th>Item ID</th>
											<th>User</th>
											<th>Checkout Date</th>
											<th>Return Date</th>
											<th>Total Days</th>
											<th></th>
											<th></th>
										</tr>";
							while($item = $resultPending->fetch_assoc()) {
								// calc total days
								$totalDays = abs(strtotime($item['dateToReturn']) - strtotime($item['dateCheckedOut']));
								$years = floor($totalDays / (365*60*60*24));
								$months = floor(($totalDays - $years * 365*60*60*24) / (30*60*60*24));
								$days = floor(($totalDays - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));


								echo "<tr id='log" . $item['logID'] . "'>
												<td><a data-toggle='tooltip' data-placement='top' title=\"" . $item['name'] . "\">". $item['itemID'] . "</a></td>
												<td>". $item['user'] ."</td>
												<td>". $item['dateCheckedOut'] . "</td>
												<td>". $item['dateToReturn'] . "</td>
												<td>". $days . "</td>
												<td><button onclick='approveItem(". $item['logID'] .")'>Approve</button></td>
												<td><button onclick='deleteItem(". $item['logID'] . ",". $item['itemID'] .")'>X</button></td>
											</tr>";
							}
							echo "</table>";
						}

						// load items that are checked out atm
						$sqlCheckedOut = "SELECT A.ID AS logID, B.ID AS itemID, dateToReturn, dateCheckedOut, user, name
															FROM LockerRoomLogs A
															JOIN LockerRoomItems B ON A.itemID = B.ID
															WHERE approver IS NOT NULL
															AND dateReturned IS NULL
															ORDER BY dateToReturn ASC ";
						$resultCheckout = $conn->query($sqlCheckedOut);
						if ($resultCheckout->num_rows > 0) {

							$today = date("Y-m-d");

							echo "<p class='tableHeader'>Checked Out</p>";
							echo "<table class='table table-striped'>
											<th>Item ID</th>
											<th>User</th>
											<th>Checkout Date</th>
											<th>Return Date</th>
											<th></th>";
							while($item = $resultCheckout->fetch_assoc()) {
								echo "<tr id='log" . $item['logID'] . "'>
												<td><a data-toggle='tooltip' data-placement='top' title='" . $item['name'] . "'>". $item['itemID'] . "</a></td>
												<td>" . $item['user'] . "</td>
												<td>" . $item['dateCheckedOut'] . "</td>";
								if ($today > $item['dateToReturn']) {
									echo "<td style='color:red;'>";
								} else {
									echo "<td>";
								}
								echo $item['dateToReturn'] . "</td>
									<td><button onclick='returnItem(". $item['logID'] .",". $item['itemID'] .")'>Return</button></td>
								</tr>";
							}
							echo "</table>";
						}

						// load history of all items
						$sqlAll = "SELECT A.ID AS logID, B.ID AS itemID, approver, dateToReturn, dateCheckedOut, user, name, returnedTo, dateReturned
												FROM LockerRoomLogs A
												JOIN LockerRoomItems B ON A.itemID = B.ID
												ORDER BY dateReturned DESC ";
						$resultAll = $conn->query($sqlAll);
						if ($resultAll->num_rows > 0) {
							echo "<a class='tableHeader' onclick='showHistory()'>History</a> <br />";
							echo "<table id='historyTable' style='display:none;' class='table table-striped'>
											<th>Item ID</th>
											<th>User</th>
											<th>Checkout Date</th>
											<th>Return Date</th>
											<th>Date Returned</th>
											<th>Approver</th>
											<th>Returned To</th>";
							while($item = $resultAll->fetch_assoc()) {
								echo "<tr id='log" . $item['logID'] . "'>
												<td><a data-toggle='tooltip' data-placement='top' title=\"" . $item['name'] . "\">". $item['itemID'] . "</a></td>
												<td>". $item['user'] ."</td>
												<td>". $item['dateCheckedOut'] . "</td>
												<td>". $item['dateToReturn'] . "</td>
												<td>". $item['dateReturned'] . "</td>
												<td>". $item['approver'] . "</td>
												<td>". $item['returnedTo'] . "</td>
											</tr>";
							}
							echo "</table>";
						}
					?>
				</div>
				<br />
				<button class="buttonStyle" onclick="manageItems()"> Manage Items </button>
				<div id='manageItems' class='manageInventoryStyle' style='display:none'>
					<?php
						$sqlUsers = "SELECT * FROM LockerRoomItems";
						$result = $conn->query($sqlUsers);
						if ($result->num_rows > 0) {
							echo "<table class='table table-striped'>
										<tr>
											<th>ID</th>
											<th>Name</th>
											<th>Quantity</th>
											<th>Quantity Available</th>
											<th>Description</th>
											<th>image</th>
											<th></th>
										</tr>
							";
							while($item = $result->fetch_assoc()) {
								echo "<tr>
												<td>". $item['ID'] . "</td>
												<td><p id='name_". $item['ID'] ."' onclick='makeTextbox(\"". $item['ID'] ."\",\"". $item['name'] ."\")'>". $item['name'] . "</p></td>
												<td>". $item['quantity'] . "</td>
												<td>". $item['quantityAvailable'] . "</td>
												<td>". $item['description'] . "</td>
												<td>". $item['image'] . "</td>";

											echo "<td><button onclick='updateUser(\"". $item['ID'] ."\", \"delete\")'>X</button></td>
											</tr>";
							}
							echo "</table>";
						}
					?>
				</div>
				<!-- <button class="buttonStyle" onclick="newItem()">Add new item</button>
				<div id='newItem' style="display:none;">
					<div class="newUserStyle form-horizontal col-xs-* col-sm-10 col-sm-offset-1">
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">First Name</label>
								<div class="col-xs-6 col-sm-7">
									<input class="form-control" type='text' id='fname' placeholder="Enter First Name"></input>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Last Name</label>
								<div class="col-xs-6 col-sm-7">
									<input class="form-control" type='text' id='lname' placeholder="Enter Last Name"></input>
								</div>
							</div>
							<div class="form-group with-input-group">
								<label class="col-xs-5 col-sm-4 control-label">Email</label>
								<div class="input-group col-xs-6 col-sm-7">
										<input class="form-control" type='text' onclick="hideUsernameInputAddon();" placeholder="Enter Username" id='username'></input>
										<span id='usernameInputAddon' class="input-group-addon">@mtu.edu</span>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Position</label>
								<div class="col-xs-6 col-sm-7">
									<select id='position' class='selectpicker col-xs-12'>
										<option value='Member'>Member</option>
										<option value='President'>President</option>
										<option value='Vice President'>Vice President</option>
										<option value='Treasurer'>Treasurer</option>
										<option value='Secretary'>Secretary</option>
										<option value='Sponsorship'>Sponsorship</option>
										<option value='Public Relations'>Public Relations</option>
										<option value='Equipment Manager'>Equipment Manager</option>
										<option value='Trip Coordinator'>Trip Coordinator</option>
										<option value='Alumni'>Alumni</option>
									</select>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Paid</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='paid'></input>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Admin</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='admin'></input>
								</div>
							</div>
							<div class="form-group">
								<label class="col-xs-5 col-sm-4 control-label">Boat Privileges</label>
								<div class="col-xs-7 col-sm-8" style="margin-top:5px">
									<input class="checkbox" type='checkbox' id='boatPrivilege'></input>
								</div>
							</div>
							<div class="col-xs-12">
								<button class="btn btn-primary" onclick="newUserSubmit()">Submit</button>
							</div> -->
							<br />
							<button class="buttonStyle" onclick="location.href = 'logout.php';">LOGOUT</button>

						</div>

				</div>

			<?php } ?>

	<?php } else if (isset($_SESSION['id_token_token'])) { ?>
			You don't have permission to do that.... <br /> If you think you should, please contact PR.
			<br />
			<a href='logout.php'>LOGOUT</a>
	<?php } else { ?>
			<a class='login' href='<?= $authUrl ?>'><img src='style/login.png' /></a>
	<?php  }  ?>
	</div>

</body>
<script>
Dropzone.options.dropzone = {
  paramName: "file", // The name that will be used to transfer the file
  maxFilesize: 5
};

window.onhashchange = hashChange;
function hashChange() {
	if (location.hash.substring(0, 8)== "#delete_") {
		deleteImage();
	}
}

</script>
</html>
