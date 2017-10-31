let ROUTE_BASE_URL,API_URL,PUBLISH_URL,HEAD_ASSETS_URL,ELEMENTS_URL,ALL_PAGES_URL,IMAGES_URL,IMAGE_UPLOAD_URL,IMAGE_REMOVE_URL,PAGE_SECTION_URL,SAVE_PAGE_URL,GET_EXTERNAL_URL,GET_GLOBAL_SETTING_URL,STORE_SECTION_URL,builderSrc;
let environment = 'prod';
switch (environment) {
    case 'dev':
        ROUTE_BASE_URL	= '/';
        API_URL = 'http://skyhub.local/admin/vb3/php/';
        PUBLISH_URL = '/admin/ajax.php?source=vb&page_action=publish';
        HEAD_ASSETS_URL = API_URL + 'custom-asset.php';
        ELEMENTS_URL = 'elements.json';
        ALL_PAGES_URL = 'pages.json';
        IMAGES_URL = API_URL + 'get_all_images.php?directory=';
        IMAGE_UPLOAD_URL = API_URL + 'upload_image.php';
        IMAGE_REMOVE_URL = API_URL + 'remove_uploaded_image.php';
        PAGE_SECTION_URL = API_URL + 'page-section.php?location=';
        SAVE_PAGE_URL = API_URL + 'save_page.php';
        GET_EXTERNAL_URL = 'externals.json';
        GET_GLOBAL_SETTING_URL = 'globals.json';
        STORE_SECTION_URL = API_URL + 'save_section.php';
        builderSrc = "elements/iframe_dev.html";
        break;
    case 'prod':
        ROUTE_BASE_URL	= '/admin/vb3/';
        API_URL = '/admin/vb3/php/';
        PUBLISH_URL = '/admin/ajax.php?source=vb&page_action=publish';
        HEAD_ASSETS_URL = API_URL + 'custom-asset.php';
        ELEMENTS_URL = API_URL + 'get_elements.php?name=body';
        ALL_PAGES_URL = API_URL + 'get_all_pages.php';
        IMAGES_URL = API_URL + 'get_all_images.php?directory=';
        IMAGE_UPLOAD_URL = API_URL + 'upload_image.php';
        IMAGE_REMOVE_URL = API_URL + 'remove_uploaded_image.php';
        PAGE_SECTION_URL = API_URL + 'page-section.php?location=';
        SAVE_PAGE_URL = API_URL + 'save_page.php';
        GET_EXTERNAL_URL = API_URL + 'get_all_externals.php';
        GET_GLOBAL_SETTING_URL = API_URL + 'get_all_globals.php';
        STORE_SECTION_URL = API_URL + 'save_section.php';
        builderSrc = "elements/iframe.html";
        break;
}

/**
 * Commone Variables
 */
const adminUrl = '/admin/';
const newDynamicForm = adminUrl + 'webformNew/dynamicForm.php?page_view=iframe';
const editDynamicForm = adminUrl + 'webformNew/dynamicForm.php?page_view=iframe&id=';
const newStaticBlock = adminUrl + 'static_blocks/create.php?page_view=iframe';
const editStaticBlock = adminUrl + 'static_blocks/create.php?page_view=iframe&sb_id=';
const newPost = adminUrl + 'posts/create_post.php?page_view=iframe';
const editPost = adminUrl + 'posts/create_post.php?page_view=iframe&post_id=';
const newEvent = adminUrl + 'posts/create_post.php?type=event&page_view=iframe';
const editEvent = adminUrl + 'posts/create_post.php?type=event&page_view=iframe&post_id=';
const newPromotion = adminUrl + 'posts/create_post.php?type=promotion&page_view=iframe';
const editPromotion = adminUrl + 'posts/create_post.php?type=promotion&page_view=iframe&post_id=';
const newSlider = adminUrl + 'sliders/settings.php?page_view=iframe';
const editSlider = adminUrl + 'sliders/settings.php?page_view=iframe&id=';
const globalSetting = adminUrl + 'settings/?type=Global&page_view=iframe';
const pageSetting = adminUrl + 'settings/?type=Global&page_view=iframe';
const editCustom = adminUrl + 'vb3/php/edit_custom.php?shortcode=';
const editImage = adminUrl + 'fm/filemanager/dialog.php?type=2&field_id=imageURL';

export {
    ROUTE_BASE_URL,
    API_URL,
    PUBLISH_URL,
    HEAD_ASSETS_URL,
    ELEMENTS_URL,
    ALL_PAGES_URL,
    IMAGES_URL,
    IMAGE_UPLOAD_URL,
    IMAGE_REMOVE_URL,
    PAGE_SECTION_URL,
    SAVE_PAGE_URL,
    GET_EXTERNAL_URL,
    GET_GLOBAL_SETTING_URL,
    STORE_SECTION_URL,
    adminUrl,
    builderSrc,
    newDynamicForm, 
    editDynamicForm,
    newStaticBlock, 
    editStaticBlock,
    newPost,
    editPost,
    newEvent,
    editEvent,
    newPromotion,
    editPromotion,
    newSlider,
    editSlider,
    pageSetting,
    globalSetting,
    editCustom,
    editImage
};