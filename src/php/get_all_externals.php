<?php
    include("../../config/config.php"); 
    header("Access-Control-Allow-Origin: *");

    $vb_url = $admin_url . "vb3/php/";
    $vb_path = $admin_path . "vb3/";

    $categories = [];

    // to add webforms menu
    $categories[] = array(
        "tsc_id"    =>  "web_forms",
        "tsc_name"  =>  "Web Forms"
    );
    // to add Static blocks menu
    $categories[] = array(
        "tsc_id"    =>  "static_blocks",
        "tsc_name"  =>  "Static Blocks"
    );
    // to add Posts menu
    $categories[] = array(
        "tsc_id"    =>  "blog_posts",
        "tsc_name"  =>  "Blog Posts"
    );
    // to add Events menu
    $categories[] = array(
        "tsc_id"    =>  "events",
        "tsc_name"  =>  "Events"
    );
    // to add Promotions menu
    $categories[] = array(
        "tsc_id"    =>  "promotions",
        "tsc_name"  =>  "Promotions"
    );

    // to add Slider menu
    $categories[] = array(
        "tsc_id"    =>  "sliders",
        "tsc_name"  =>  "Sliders"
    );

    $elements = array();
    foreach ($categories as $key => $cat) {
    	$element = array();
    	$new_page_url = '';
    	$title = '';

        switch ($cat['tsc_id']) {
            case 'web_forms':
                $query = "SELECT wf_id as ts_id, wf_title as ts_title, '/admin/assets/img/shortcode.png' as ts_preview_image, '' as ts_height, 'webform' as block_type  FROM web_forms where org_id = {$org_id}";  
                $shortcode = '[form id="%d"]';
                break;
            case 'static_blocks':
                $query = "SELECT sb_id as ts_id, sb_title as ts_title, '/admin/assets/img/shortcode.png' as ts_preview_image, '' as ts_height, 'static_block' as block_type  FROM static_blocks where org_id = {$org_id}";  
                $shortcode = '[block id="%d"]';
                break;
            case 'blog_posts':
                $query = "SELECT post_id as ts_id, post_title as ts_title, '/admin/assets/img/blog_posts.png' as ts_preview_image, '' as ts_height, 'blog_post' as block_type  FROM posts where org_id = {$org_id} AND is_blog = 1";   
                $shortcode = '[post id="%d" type="Blog"]';
                break;
            case 'events':
                $query = "SELECT post_id as ts_id, post_title as ts_title, '/admin/assets/img/events.png' as ts_preview_image, '' as ts_height, 'event' as block_type  FROM posts where org_id = {$org_id} AND is_event = 1";  
                $shortcode = '[post id="%d" type="Event"]';
                break;
            case 'promotions':
                $query = "SELECT post_id as ts_id, post_title as ts_title, '/admin/assets/img/promotions.png' as ts_preview_image, '' as ts_height, 'promotion' as block_type  FROM posts where org_id = {$org_id} AND is_promotion = 1";  
                $shortcode = '[post id="%d" type="Promotion"]';
                break;
            case 'sliders':
                $query = "SELECT sl_id as ts_id, sl_title as ts_title, '/admin/assets/img/sliders.png' as ts_preview_image, '' as ts_height, 'slider' as block_type  FROM sliders where org_id = {$org_id} AND (sl_slider_type = 'Slider' OR sl_slider_type = '')"; 
                $shortcode = '[slider id="%d"]';
                break;
        }

        $sections = $db->get_results($query);
    	
        if (count($sections)) {
        	foreach ($sections as $sec) {
        		$item = array();
                
                $height = !empty($sec['ts_height']) ? $sec['ts_height'] : 150;
                $sec['ts_title'] = str_ireplace('"', '\"', $sec['ts_title']);
            	$item['url'] = $vb_url.'section-html.php?pagename='.$pagename.'&section_id='.$sec['ts_id'].'&block_type='.$sec['block_type'];
                $item['shortcode'] = base64_encode(sprintf($shortcode, $sec['ts_id']));
            	$item['thumbnail'] = $sec['ts_preview_image'];
            	$item['title'] = htmlspecialchars( utf8_encode($sec['ts_title']));
            	$element[] = $item;
            }
        }
    	$elements[$cat['tsc_name']] = $element;
    }
    
    $value['elements'] = $elements;
    echo json_encode($value);
?>