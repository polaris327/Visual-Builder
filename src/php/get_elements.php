<?php
    include("../../config/config.php"); 
    error_reporting(1);
    header("Access-Control-Allow-Origin: *");

    $vb_url = $admin_url . "vb3/php/";
    $vb_path = $admin_path . "vb3/";

    if (isset($_GET["name"])) {
        $pagename = htmlspecialchars($_GET["name"]);
    } else {
        header("Location: ".$admin_url."custom-pages.php");
        exit;
    }

    $page = $db->get_results("SELECT * FROM webpages WHERE location = '$pagename' AND org_id = $org_id" );
    $page_id = $page[0]['page_id'];

    if (isset($_GET['type'])) {
        $Ptype = $_GET['type'];
    } else {
        $Ptype = 1;
    }
    
    $all_pages = $db->get_results("SELECT * FROM webpages WHERE org_id = $org_id and page_type = $Ptype and location NOT IN ('header','footer','css','js') ORDER BY page_name ");
    $all_posts = $db->get_results("SELECT * FROM posts WHERE org_id = $org_id and post_status = 1 ");

    $errors = array();
    if (isset($_SESSION['errors'])) {
        $errors = $_SESSION['errors'];
        unset($_SESSION['errors']);
    }

    if (isset($_SESSION['success'])) {
        unset($_SESSION['success']);
    }
  
    $no_access_pages = array(
        "css"           =>  "Site CSS",
        "header"        =>  "Site Header",
        "footer"        =>  "Site Footer",
        "js"            =>  "Site JS",
    );

    $static_categories = $super_admin_db->get_results("SELECT tsc_id, tsc_name FROM theme_section_categories LEFT JOIN theme_sections ON ( tsc_id = ts_category and ts_theme_id = tsc_theme_id ) WHERE ts_theme_id = $theme_id GROUP BY tsc_id");

    $categories = array();
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

    $page[0]['page_restore_point'] = $page[0]['page_restore_point'] ? $page[0]['page_restore_point'] : 0;
    $forward_restore_point = 0;
    $last_restore_point = 0;

    $check_last_restore_point = $db->get_row("SELECT pr_id FROM `page_restore_point` WHERE org_id = {$org_id} AND location = '{$pagename}' AND pr_id < {$page[0]['page_restore_point']} ORDER BY pr_id DESC");
    if (count($check_last_restore_point)) {
        $last_restore_point = $check_last_restore_point[0];
    }

    $check_forward_restore_point = $db->get_row("SELECT pr_id FROM `page_restore_point` WHERE org_id = {$org_id} AND location = '{$pagename}' AND pr_id > {$page[0]['page_restore_point']}  ORDER BY pr_id");
    if (count($check_forward_restore_point)) {
        $forward_restore_point = $check_forward_restore_point[0];
    }

    $elements = array();
    // Get static elements from theme section
    
    $custom_sections = $super_admin_db->get_results("SELECT ts_html FROM theme_user_section WHERE ts_id = $theme_id AND org_id = $org_id");
    $custom_elements = array();
    foreach ($custom_sections as $key => $section) {
        $item = array();
        $item['url'] = $vb_url.'user-section.php?section_id='.$section['tus_id'];
        $item['thumbnail'] = '/admin/assets/img/shortcode.png';
        $item['title'] = 'User Saved - '. ($key + 1);
        $item['dynamic'] = false;
        $custom_elements[] = $item;
    }
    $elements['User Sections'] = $custom_elements;
    $design_elements = array();
    foreach ($static_categories as $cat) {
        $sections = $super_admin_db->get_results("SELECT *, 'theme_section' as block_type FROM  theme_sections where ts_theme_id = $theme_id AND ts_category = ". $cat['tsc_id'] );
        if (count($sections)) {
            foreach ($sections as $sec) {
                $design_item = array();
                if ($sec['block_type'] == 'theme_section') {
                    $sec['ts_preview_image'] = !empty($sec['ts_preview_image']) ? ($section_cat_img_path . $sec['ts_preview_image']) : '';
                }

                if (empty($sec['ts_preview_image'])) {
                    $sec['ts_preview_image'] = "/assets/images/digilogo.png";
                }

                $sec['ts_title']    =   str_ireplace('"', '\"', $sec['ts_title']);
                $design_item['url'] = $vb_url.'section-html.php?pagename='.$pagename.'&section_id='.$sec['ts_id'].'&block_type='.$sec['block_type'];
                $design_item['thumbnail'] = $sec['ts_preview_image'];
                $design_item['title'] = htmlspecialchars( utf8_encode($sec['ts_title']));
                $design_item['dynamic'] = false;
                $design_elements[$cat['tsc_name']][] = $design_item;
            }
        }
    }
    $elements['Design'] = $design_elements;
    // Get dynamic elements from

    foreach ($categories as $key => $cat) {
        $dynamic_element = array();
        $shortcode = '';
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
            foreach ($sections as $key => $sec) {
                $dynamic_item = array();
                if ($sec['block_type'] == 'theme_section') {
                    $sec['ts_preview_image'] = !empty($sec['ts_preview_image']) ? ($section_cat_img_path . $sec['ts_preview_image']) : '';
                }

                if (empty($sec['ts_preview_image'])) {
                    $sec['ts_preview_image'] = "/assets/images/digilogo.png";
                }
 
                $sec['ts_title']    =   str_ireplace('"', '\"', $sec['ts_title']);
                $dynamic_item['url'] = $vb_url.'section-html.php?pagename='.$pagename.'&section_id='.$sec['ts_id'].'&block_type='.$sec['block_type'];
                $dynamic_item['thumbnail'] = $sec['ts_preview_image'];
                $dynamic_item['title'] = htmlspecialchars( utf8_encode($sec['ts_title']));
                $dynamic_item['dynamic'] = true;
                $dynamic_item['shortcode'] = base64_encode(sprintf($shortcode, $sec['ts_id']));
                $dynamic_element[] = $dynamic_item;
            }
        }
        $elements[$cat['tsc_name']] = $dynamic_element;
    }
    
    $value['elements'] = $elements;
    echo json_encode($value);
    exit;
?>