
<?php

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "oracle";
$dbname = "RPi";


$conn = mysqli_connect($servername,$username,$password,$dbname);

// Check connection
if (mysqli_connect_errno($conn))
{
    echo "Failed to connect to DataBase: " . mysqli_connect_error();
}else
{
	
    $data_points = array();
	$select_city = $conn->prepare("SELECT TIME,HUMIDITY,PRESSURE,ALTITUDE,SEALEVEL,TEMPERATURE,TEMPERATURE_BMP FROM SENSOR ORDER BY TIME desc LIMIT 110");
	$select_city->execute();
	$select_city->bind_result($TIME,$HUMIDITY,$PRESSURE,$ALTITUDE,$SEALEVEL,$TEMPERATURE,$TEMPERATURE_BMP);
	$select_city->store_result();
	
    while($select_city->fetch())
    {        
        $point = array("time"=>(strtotime($TIME))*1000 , "TemperatureIn"=>$TEMPERATURE,"TemperatureOut"=>$TEMPERATURE_BMP , "Humidity"=>$HUMIDITY,"Pressure"=>$PRESSURE,"Grnd_level"=>$ALTITUDE,"Sea_level"=>$SEALEVEL);
        
	array_push($data_points, $point);        
    }
	$select_city->close();
	
    echo json_encode(array_reverse($data_points), JSON_NUMERIC_CHECK);
}
mysqli_close($conn);

?>
