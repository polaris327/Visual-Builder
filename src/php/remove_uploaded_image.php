<?php
	$file = '../' . $_POST['uploaded'];
	
	$return = array();
	if (!file_exists($file)) {
		$return['code'] = 0;
		$return['response'] = 'The specified file does not exist. Please provide a correct path. ';

		die( json_encode($return) );
	}

	if (unlink($file)) {
		$return['code'] = 1;
		$return['response'] = $_POST['uploaded'];
	} else {
		$return['code'] = 0;
		$return['response'] = 'Could not be removed.';
	}
	
	echo json_encode($return);
?>