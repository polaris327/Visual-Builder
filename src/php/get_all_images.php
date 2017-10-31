<?php
	include("../../config/config.php"); 
    header("Access-Control-Allow-Origin: *");
	$scope = $root_path . '/assets/images/';	
	if (!isset($_GET['directory'])) {
		$directory = $scope;
	}
	else {
		$directory = $_GET['directory'];
	}
	$allowed_types = array('image/jpeg', 'image/gif', 'image/png', 'image/svg');

	if (strpos($directory, $scope) === 0) {

	}
	else {
		$directory = $scope;
	}
	$allfiles = scandir($directory);
	$dir_arr = [];
	$file_arr = [];
	foreach ($allfiles as $item) {
		if (is_dir($directory . DIRECTORY_SEPARATOR . $item)) {
			$dir_arr[] = array(
				"url" => $directory . DIRECTORY_SEPARATOR . $item,
				"title" => $item
				);
		}
		else if (in_array(mime_content_type($directory . DIRECTORY_SEPARATOR . $item), $allowed_types)) {
			$file_arr[] = array(
				"url" => str_replace($scope, '', $directory . DIRECTORY_SEPARATOR . $item),
				"title" => $item
				);
		}
	}
	$structure = array('dir' => $dir_arr, 'file' => $file_arr);
	echo json_encode($structure);
?>