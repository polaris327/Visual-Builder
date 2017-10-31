<?php 
  include("../../config/config.php"); 
  header("Access-Control-Allow-Origin: *");
  $vb_url = $admin_url . "vb3/php/";

  // load page settings
  load_settings();

  $section_count = 0;
  if (isset($_GET['section_count']) and $_GET['section_count'] > 0) {
    $section_count = $_GET['section_count'];
  }

  $q = "SELECT saved_page_content,page_title,css,js,page_content FROM webpages WHERE org_id = $org_id";
  if (isset($_GET["pageid"])) {
    $pageid = htmlspecialchars($_GET["pageid"]);
    $q .= " AND page_id = $pageid";
  } else {
    $location = htmlspecialchars($_GET['location']);
    $q .= " AND location = '$location'";
  }

  // get page css
  $row = $db->get_row("SELECT page_content FROM webpages WHERE location ='css' AND org_id = ".$org_id);
  $css_content = $row[0];

  // get page JS
  $row = $db->get_row("SELECT page_content FROM webpages WHERE location ='js' AND org_id = ".$org_id);
  if (count($row)) {
    $js_content = $row[0];
  } else {
    $js_content = "";
  }

  $row = $db->get_row($q);
  if (!empty($row[0])) {
    $content = $row[0];
  } else {
    $content = $row[4];
  }
  $body_content = $content;

  // if count is set, then break the HTML to ge that section only
  if ($section_count) {
    include($root_path."includes/class_html_dom.php");
    $html = str_get_html($content);
    $sections = $html->root->children;

    if (count($sections)) {
      $this_section_count = 1;
      foreach ($sections as $sec) {
        if ($sec->tag != 'comment') {
          if ($section_count == $this_section_count) {
            $body_content = $sec;
          }

          $this_section_count++;
        }
      }
    }
  }

  $title = $row[1];
  $cust_css = $row[2];
  $cust_js = $row[2];
?>
<?php echo pass_through_functions($body_content,'','vb'); ?>