<?php
	$subject=$email=$message="";
	$error=$subjectError=$emailError=$messageError=$generalError="";
	$secret="6LdInRcTAAAAAKbVYq_joBkF2z9lhr_fkHgMjw-I";
	
	
	$to="contactforpi@gmail.com";
	$header="FoRPi";
	
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		if(empty($_POST["subject"])){
			$subjectError="Subject is required!";
		}else{
			$subject=test_input($_POST["subject"]);
			if(!preg_match("/^[a-zA-Z ]*$/",$subject)){
				$subjectError="Only letters and white space allowed";
			}
		}
		if(empty($_POST["email"])){
			$emailError="Email is required!";
		}else{
			$email=test_input($_POST["email"]);
			if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
				$emailError="Invalid email format";
			}
		}
		if(empty($_POST["message"])){
			$messageError="Message is required!";
		}else{
			$message=test_input($_POST["message"]);
		}
		if(empty($_POST["g-recaptcha-response"])){
			$generalError="Please use re-captcha for security reasons!";
		}else{
			$captcha=($_POST["g-recaptcha-response"]);
			$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER['REMOTE_ADDR']);
			$decoded_response = json_decode($response);
			if ($decoded_response->success){
				$success="Email was send successfully";
			}
		}
	}else{
		echo $generalError="Error: method to send data is not POST!";
	}
	
	function test_input($data){
		$data=trim($data);
		$data=stripslashes($data);
		$data=htmlspecialchars($data);
		return $data;
	}
	$header = "From: ".$email;
	
	
	if(($subjectError!="") || ($emailError!="") || ($messageError!="") || ($generalError!="")){
		$error=array("subjectError"=>$subjectError,"emailError"=>$emailError,"messageError"=>$messageError,"generalError"=>$generalError);
		$success="";
		
	}else{
		$send = mail($to,$subject,$message,$header);
		if($send){
			$success="Email was send successfully";
		}else{
			$generalError=("Error: send message fail with status: ".$send);
		}
	}
	echo (json_encode(array("subjectError"=>$subjectError,"emailError"=>$emailError,"messageError"=>$messageError,"generalError"=>$generalError,"success"=>$success)));
	
?>