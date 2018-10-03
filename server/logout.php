<?php
   session_start();

  unset($_SESSION['id_token_token']);
  unset($_SESSION['name']);

     echo 'You have successfully logged out';
   header('Refresh: 2; URL = http://mtufishing.club/');
?>


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
   <script>
   setTimeout(function() {
      window.location.href = 'http://mtufishing.club/';
   }, 500);
   </script>
</body>
</html>
