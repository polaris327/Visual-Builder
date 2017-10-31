<?php
include("../../config/config.php");

$shortcode = base64_decode($_GET['shortcode']);
$shortcode_arr = explode("-",$shortcode,2);

$custom_html_type = $shortcode_arr[0];
$record_id = $shortcode_arr[1];

$edit_url = '';
$heading = '';

//if webform
if ( $custom_html_type == 'MenuItems' ) {
	
	$data = $db->get_row(  "SELECT dm_id FROM dynamic_menu WHERE org_id = {$org_id} AND dm_menu = ?", array(['s'=>$record_id]) );
	$id = $data[0];
	$edit_url = $admin_url."menus/menu_items.php?dm_id={$id}&page_view=iframe";
	$heading = 'Menu Items : '.$record_id;
}

//if Display Records
if ( $custom_html_type == 'DisplayRecords' ) {
	
	$data = $db->get_row(  "SELECT `dr_id` FROM `display_records` WHERE org_id = {$org_id} AND `dr_key` = ?", array( ['s'=>$record_id] ) );
	$id = $data[0];
	$edit_url = $admin_url."displayRecords/recordData.php?id=".$id."&page_view=iframe";
	$heading = 'Display Records : '.$record_id;
}


//if Comments/Reviews
if ( $custom_html_type == 'Comments' ) {
	
	$data = $db->get_row(  "SELECT `ct_id` FROM `comment_type` WHERE `ct_name` = ?", array( ['s'=>$record_id] ) );
	$id = $data[0];
	$edit_url = $admin_url."comments/?type=".$id."&page_view=iframe";
	$heading = 'Comments/Reviews ( Type:'.$record_id.' )';
}

header('location:'.$edit_url);
?>
