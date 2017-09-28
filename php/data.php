<?php
//setting header to json
header('Content-Type: application/json');
//database
define('DB_HOST', '192.168.16.7');
define('DB_USERNAME', '5N2W89reqpav');
define('DB_PASSWORD', '%%8+Z_4+*_7C-wF');
define('DB_NAME', '9y82C8f47x9b');
//get connection
$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
if(!$mysqli){
	die("Connection failed: " . $mysqli->error);
}
//query to get data from the table
$query = sprintf("SELECT * FROM issuedetails");
//execute query
$result = $mysqli->query($query);
//loop through the returned data
$data = array();
foreach ($result as $row) {
	$data[] = $row;
}
//free memory associated with result
$result->close();
//close connection
$mysqli->close();
//now print the data
print json_encode($data);