<?php
	include("../../config/config.php"); 
	header("Access-Control-Allow-Origin: *");
	$vb_url = $admin_url . "vb3/php/";

	// load page settings
	load_settings();

	$row = $db->get_row("SELECT page_content FROM webpages WHERE location ='css' AND org_id = ".$org_id);
	$css_content = $row[0];

	$row = $db->get_row("SELECT page_content FROM webpages WHERE location ='js' AND org_id = ".$org_id);
	$js_content = $row[0];

	$row = $db->get_row("SELECT css,js FROM webpages WHERE location ='$pagename' AND org_id = ".$org_id);
	$cust_css = $row[0];
	$cust_js = $row[1];
?>
<script>
	var adminlocalUrl = '<?php echo $admin_url; ?>';
	var environment = '<?php echo ENVIRONMENT; ?>';
	var localUrl = '<?php echo $root_url; ?>';
	var fileDIR = '<?php echo $db_name; ?>';
</script>
<?php echo $css_content; ?>
<?php echo $cust_css; ?>
<?php echo $cust_js; ?>
<?php echo $js_content; ?>