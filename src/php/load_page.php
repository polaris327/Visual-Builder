<?php
	$file = '../elements/pages/' . $_GET['file'];
	$return = array();

	if (!file_exists($file)) {
		$return['code'] = 0;
		$return['response'] = 'The specified file does not exist. Please provide a correct file path. ';

		die( json_encode($return) );
	}

	$return['code'] = 1;
	$return['content'] = file_get_contents($file);

	echo json_encode($return);
?>