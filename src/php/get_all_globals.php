<?php
    include("../../config/config.php"); 
    header("Access-Control-Allow-Origin: *");
    $vb_url = $admin_url . "vb3/php/";
    $vb_path = $admin_path . "vb3/";

    $all_pages = $db->get_results("SELECT * FROM cms_settings WHERE org_id = ".$org_id);
    $json_arr = array();
    foreach ($all_pages as $key => $value) {
        # code...
        $json_arr[] = $value;      
    }
    echo json_encode($json_arr);
?>