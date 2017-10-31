<?php
    include("../../config/config.php"); 
    header("Access-Control-Allow-Origin: *");
    $vb_url = $admin_url . "vb3/php/";
    $vb_path = $admin_path . "vb3/";
    
    if (isset($_GET['type'])) {
        $Ptype = $_GET['type'];
    } else {
        $Ptype = 1;
    }

    $all_pages = $db->get_results("SELECT page_id, page_name, page_title, location FROM webpages WHERE org_id = $org_id and page_type = $Ptype and location NOT IN ('header','footer','css','js') ORDER BY page_name ");
    $json_arr = array();
    foreach ($all_pages as $key => $value) {
        # code...
        $value['page_title'] = htmlspecialchars( utf8_encode($value['page_title']));   
        $value['page_name'] = htmlspecialchars( utf8_encode($value['page_name']));
        $json_arr[] = $value;      
    }
    echo json_encode($json_arr);
?>