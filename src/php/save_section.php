<?php
	require ('../../config/config.php'); 

	if (!isset($_POST['section'])) {
		exit();
	}
	
	$code = $_POST['section'];

	if (!isset($_SESSION[ 'user_id' ])) { 
		die("Session Expired.");
	}

    $code = str_ireplace('<div class="_vb-col-ctrler"><a class="_vb_ctrler-item pencil"><i class="fa fa-pencil _vb_ctrler-item edit"></i></a><a class="_vb_ctrler-item remove"><i class="fa fa-trash _vb_ctrler-item remove"></i></a><a class="_vb_ctrler-item column"><i class="fa fa-arrows _vb_ctrler-item column"></i></a></div>', '', $code);
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

	// if restore point for page is set, then add to webpages table.
    $db_arr = array(
        'ts_id'	=>	$theme_id,
        'ts_html' => $code,
        'org_id' => $org_id
    );

    echo $db->insert( 'theme_user_section', $db_arr, 0, 1 );

?>