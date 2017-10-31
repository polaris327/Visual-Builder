<?php
	$directory = $_GET['directory'];
	$allowed_types = array('image/jpeg', 'image/gif', 'image/png', 'image/svg');

	$return = array();

	if (!file_exists($directory)) {
		$return['code'] = 0;
		$return['response'] = 'The specified upload location does not exist. Please provide a correct upload folder. ';

		die( json_encode($return) );
	}

	if (!is_writable($directory)) {
		$return['code'] = 0;
		$return['response'] = 'The specified upload location is not writable. Please make sure the specified folder has the correct write permission set for it.';

		die( json_encode($return) );
	}

	if (!isset($_FILES['imgFileField']['error']) || is_array($_FILES['imgFileField']['error'])) {
		$return['code'] = 0;
		$return['response'] = $_FILES['imgFileField']['error'];

		die( json_encode($return) );
	}

	$name = $_FILES['imgFileField']['name'];
	$file_type = $_FILES['imgFileField']['type'];

	if (in_array($file_type, $allowed_types)) {
		$file_info = pathinfo($name);
		$new_file_name = $file_info['filename'] . microtime() . '.' . $file_info['extension'];
		$uploaded_file_name = $directory . $new_file_name;

		if (move_uploaded_file($_FILES['imgFileField']['tmp_name'], $uploaded_file_name)) {
			// uploaded
			$return['code'] = 1;
			$return['response'] = $directory . DIRECTORY_SEPARATOR . $new_file_name;
		} else {
			$return['code'] = 0;
			$return['response'] = 'File could not be saved.';
		}
	}
	else {
		$return['code'] = 0;
		$return['response'] = 'File type not allowed.';
	}
	echo json_encode($return);
?>