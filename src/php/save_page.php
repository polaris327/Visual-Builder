<?php
	require ('../../config/config.php'); 

	if (!json_decode($_POST['content'])) {
		exit('Not valid content!');
	}
	$code_arr = json_decode($_POST['content']);
	$code = '';
	foreach ($code_arr->blockList as $key => $code_obj) {
		if ($key != 0 && $key != (count($code_arr->blockList) - 1)) {
			$code .= $code_obj->html;
		}
	}
	$pageid = $_POST['pageid'];
	$page = $db->get_results("SELECT * FROM webpages WHERE location = '$pageid' AND org_id = $org_id" );
	$location = $page[0]['location'];

	# Redirect if not logged in.
	if (!isset($_SESSION[ 'user_id' ])) { 
		die("Session Expired.");
	}

	$table = "webpages";
	
	$code = str_ireplace('<div class="_vb_col-ctrler"><a class="_vb_ctrler-item pencil"><i class="fa fa-pencil _vb_ctrler-item edit"></i></a><a class="_vb_ctrler-item remove"><i class="fa fa-trash _vb_ctrler-item remove"></i></a><a class="_vb_ctrler-item column"><i class="fa fa-arrows _vb_ctrler-item column"></i></a></div>', '', $code);
	$code = str_ireplace('ui-sortable', '', $code);
	$code = str_ireplace('_vb_element-dynamic', '', $code);
	$code = str_ireplace('_vb-col-ctrler', '', $code);
	$code = str_ireplace('_vb-cell-editing', '', $code);
	$code = str_ireplace('outline: rgba(233, 94, 94, 0.498039) solid 2px; outline-offset: -2px; cursor: pointer;', '', $code);
	$code = str_ireplace('outline: 2px solid rgba(233, 94, 94, 0.5); outline-offset: -2px; cursor: pointer;', '', $code);
	$code = str_ireplace('outline: rgba(233, 94, 94, 0.498039) solid 2px; cursor: pointer; outline-offset: -2px;', '', $code);

	$code = str_ireplace('outline: none; cursor: inherit;', '', $code);
	$code = str_ireplace('outline: medium none; outline-offset: -2px; cursor: inherit;', '', $code);
	$code = str_ireplace('outline: medium none; cursor: inherit;', '', $code);
	
	$code = str_ireplace('data-selector=".editContent"', '', $code);
	$code = str_ireplace('data-selector="img"', '', $code);
	$code = str_ireplace('data-selector="a.btn, button.btn"', '', $code);

	$code = str_ireplace('contenteditable="true"', '', $code);
	$code = str_ireplace('spellcheck="true"', '', $code);
	$code = str_ireplace('role="textbox"', '', $code);
	$code = str_ireplace('aria-multiline="true"', '', $code);
	$code = str_ireplace('data-placeholder="Type your text"', '', $code);
	$code = str_ireplace('data-medium-focused="true"', '', $code);

	/* check if any shortcode has been rendered, if yes, convert HTML to shortcode */
	// include html parsing class
	include_once($root_path.'includes/class_html_dom.php');
	$code = trim($code);
	if (!empty($code)) {
		// pass the html to html dom class function
		$html = str_get_html($code);
		foreach ($html->find('._vb_col-ctrler') as $col_container) {
			$col_html = $col_container->outertext;
			$code = str_ireplace($col_html, '', $code);
		}

		foreach ($html->find('.container_dynamic') as $dynamic_container) {
			if (isset($dynamic_container->label) and !empty($dynamic_container->label)) {
				$shortcode_html = $dynamic_container->outertext;
				$shortcode_label = base64_decode($dynamic_container->label);
				$code = str_ireplace($shortcode_html, $shortcode_label, $code);
			}
		}

		// check for shortcode slugs HTML
		foreach ($html->find('.container_slug') as $dynamic_container) {
			if (isset($dynamic_container->label) and !empty($dynamic_container->label)) {
				$shortcode_html = $dynamic_container->outertext;
				$shortcode_label = base64_decode($dynamic_container->label);
				
				// replace HTML by its shortcode
				$code = str_ireplace($shortcode_html, $shortcode_label, $code);
			}
		}

		$check_custom = '';
		foreach ($html->find('.dynamic_custom_html') as $dynamic_container) {
			//handle dynamic menus
			if (strpos($dynamic_container->class, 'dynamic_menu') !== false) {
				if (isset($_SESSION['custom_html']['dynamic_menu']) and isset($dynamic_container->custom)) {
					$shortcode_html = $dynamic_container->outertext;

					if( $check_custom != $dynamic_container->custom ){
						$custom_html = base64_decode($_SESSION['custom_html']['dynamic_menu'][$dynamic_container->custom]);
						$check_custom = $dynamic_container->custom;
					}else{
						$custom_html = '';
					}

					$code = str_ireplace($shortcode_html, $custom_html, $code);
				}
			}

		}
		unset($html);
	}

	if ($location == 'css' or $location == 'js') {
		// if global css/js
		$db_arr = array(
			"page_content"	=>	$code,
			"saved_page_content"	=>	$code
		);	
		$create_history = 1;	
	} else {
		// if other pages
		$db_arr = array(
			"saved_page_content"	=>	$code
		);	
		$create_history = 0;
	}

	$check = $db->get_results("SELECT * FROM webpages WHERE location = '$location' AND org_id = $org_id" );
	if (count($check) > 0) {
		$check = $check[0];
		
		/*START: This is to overcome a test case when 2 pages are being edited in VB by two users, Header or Footer will not save for one of the users otherwise.*/
		$skip = 0;
		if( $location == 'header' || $location == 'footer' ){
			$page_edited_time  = strtotime($check['edited_at']);
			$current_time = strtotime(date('Y-m-d H:i:s'));
			$time_difference = $current_time - $page_edited_time;
			if( $time_difference > 5 ){
				$skip = 1;
			}
		}
		/*END*/

		$where_clause = array( 
			"location"	=>	$location,
			"org_id"	=>	$org_id
		);
		
		if ($check['edited_by'] > 0 and !$skip) {
			$response = $db->update( $table, $db_arr, $where_clause );	
		} else {
			$response = $db->update( $table, $db_arr, $where_clause );	
		}

		//version control for webpages
		if( $create_history ){
			create_page_history('',$check);
		}	
	} else {
		$db_arr['location'] = $location;
		$db_arr['org_id'] = $org_id;
		$response = $db->insert( $table, $db_arr );
	}

	//creaet restore point so that can be used in Redo/Undo options
	if ($create_restore_point) {
		//Keep max 10 records for a page
		$check_max_records = $db->num_rows("SELECT * FROM page_restore_point WHERE org_id = $org_id AND location = '{$location}' ");
		if( $check_max_records >= 11 ){
			$db->query("DELETE FROM page_restore_point WHERE org_id = $org_id AND location = '{$location}' ORDER BY pr_id LIMIT 1");
		}

		//check if forward points exist, if yes, then delete
		if( count($check) and $check['page_restore_point'] > 0 ){
			$db->query("DELETE FROM page_restore_point WHERE org_id = $org_id AND location = '{$location}' AND pr_id > {$check['page_restore_point']}");
		}

		$db_arr = array(
			'page_content'	=>	$code,
			'location'		=>	$location,
			'org_id'		=>	$org_id,
			'user_id'		=>	$_SESSION['user_id'],
		);
		$page_restore_point = $db->insert( 'page_restore_point', $db_arr, 0, 1 );
	}

	// if restore point for page is set, then add to webpages table.
	if (isset($page_restore_point) and $page_restore_point > 0) {
		$db_arr = array(
			'page_restore_point'	=>	$page_restore_point
		);
		$where_clause = array( 
			"location"	=>	$location,
			"org_id"	=>	$org_id
		);

		$db->update( $table, $db_arr, $where_clause );
	}
?>