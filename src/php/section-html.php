<?php
	include("../../config/config.php"); 
	header("Access-Control-Allow-Origin: *");
  	$vb_url = $admin_url . "vb3/php/";

	// load page settings
  	load_settings();

  	$section_id = $_GET['section_id'];
  	$pagename = $_GET['pagename'];
  	$block_type = $_GET['block_type'];

  	$row = $db->get_row("SELECT page_content FROM webpages WHERE location ='css' AND org_id = ".$org_id);
	$css_content = $row[0];

	$row = $db->get_row("SELECT page_content FROM webpages WHERE location ='js' AND org_id = ".$org_id);
	$js_content = $row[0];
	
	$row = $db->get_row("SELECT css,js FROM webpages WHERE location ='$pagename' AND org_id = ".$org_id);
	$cust_css = $row[0];
	$cust_js = $row[1];

	$body_content = '';
	$short_code = '';

	if ($block_type == 'theme_section') {
	  	$data = $super_admin_db->get_row("SELECT ts_html FROM theme_sections WHERE ts_theme_id = $theme_id AND ts_id = $section_id");
	  	$body_content = $data[0];
	}
	elseif ($block_type == 'webform') {
	  	$short_code = '[form id="'.$section_id.'"]';
	}
	elseif ($block_type == 'static_block') {
	  	$short_code = '[block id="'.$section_id.'"]';
	}
	elseif ($block_type == 'blog_post') {
	  	$short_code = '[post id="'.$section_id.'" type="Blog" length="full"]';
	}
	elseif ($block_type == 'event') {
	  	$short_code = '[post id="'.$section_id.'" type="Event" length="full"]';
	}
	elseif ($block_type == 'promotion') {
	  	$short_code = '[post id="'.$section_id.'" type="Promotion" length="full"]';
	}
	elseif ($block_type == 'slider') {
	  	$short_code = '[slider id="'.$section_id.'"]';
	}

  	if(!empty($short_code)) {
  		$body_content = "<div>{$short_code}</div>";
  	}
?>
<?php echo pass_through_functions($body_content,'','vb'); ?>