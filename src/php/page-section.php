<?php
	include("../../config/config.php");
	include($root_path."includes/class_html_dom.php");
	header("Access-Control-Allow-Origin: *");
	$vb_url = $admin_url . "vb3/php/"; 

	function getGuid(){
		return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
	}

	if( isset( $_GET['location'] ) ){
			$page_data = $db->get_results("SELECT * FROM webpages WHERE org_id = $org_id AND location = '". $_GET['location'] . "'" );

			if( count($page_data) ){
				$page_data = $page_data[0];

				//build page content
				if( !empty($page_data['saved_page_content']) ){
					$content = $page_data['saved_page_content'];
				}else{
					$content = $page_data['page_content'];
				}

				$blocks = array();
				//if editing page is a global header/footer then doesn't include header or footer and set content frame id accordingly so that page saves to respective header or footer section.
				$global_header_footer = ($page_data['location'] == 'header' || $page_data['location'] == 'footer');

				//if include header and editing page is not a header ( To avoid duplicate header )
				if( $page_data['include_header'] and !$global_header_footer ){
					//build page header
					$frame_header_arr = array(
						"id" 	=> getGuid(),
						"header" => true,
						"dynamic" => true,
						"url"	=>	$vb_url . "get_page_html.php?location=header",
						"html"  => ''
					);
					$blocks[] = $frame_header_arr;
				}
				
				if( !empty($content) ){
					$html = str_get_html($content);
					$sections = $html->root->children;
				}else{
					$sections	=	array();
				}
				
				//if page html can be broken in sections
				if( count($sections) ){
					$section_count = 1;
					foreach( $sections as $sec ){
						if( $sec->tag != 'comment' ){
							$frame_arr = array(
								"id" 	=> getGuid(),
								"url"	=>	$vb_url . "get_page_html.php?section_count={$section_count}&pageid={$page_data['page_id']}",
								"html"  => ''
							);
							$blocks[] = $frame_arr;
							$section_count++;
						}
					}
				}
				else{
					//otherwise create single section of page content
					$frame_arr = array(
						"id" 	=> getGuid(),
						"url"	=>	$vb_url . "get_page_html.php?pageid=" . $page_data['page_id'],
					);

					$blocks[] = $frame_arr;
				}

				//if include footer and editing page is not a footer ( To avoid duplicate footer )
				if( $page_data['include_footer'] and !$global_header_footer ){
					//build page footer
					$frame_footer_arr = array(
						"id" 	=> getGuid	(),
						"footer" => true,
						"dynamic" => true,
						"url"	=>	$vb_url . "get_page_html.php?location=footer",
					);
					$blocks[] = $frame_footer_arr;
				}

				$page_arr = array(
					"blockList"	=>	$blocks,
					"screen" => "desktop"
				);
				exit( json_encode($page_arr) );
			}
		/*}*/
	}
?>