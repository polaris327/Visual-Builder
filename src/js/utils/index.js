import {
	editDynamicForm,
	editStaticBlock,
	editPost,
	editEvent,
	editPromotion,
	editSlider,
	editCustom
} from '../constants/urlNames';

export const headerStyles = [
	'elements/css/admin-style.css',
	'elements/css/style-basic.css',
	'elements/css/style-content.css',
	'elements/css/style-divider.css',
	'elements/css/style-headers.css',
	'elements/css/style-intro.css',
	'elements/css/style-services.css',
	'elements/css/style-team.css',
	'elements/css/style-download.css',
	'elements/css/style-navigation.css',
	'elements/css/style-extra-pages.css',
	'elements/css/style.css',
	'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css',
	'https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css',
	'https://fonts.googleapis.com/css?family=Open+Sans:300,400,700,800',
	'https://fonts.googleapis.com/css?family=Roboto:100,300,400'];

export const headerScripts = [
	'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js',
	'https://maxcdn.bootstrapcdn.com/bootstrap/latest/js/bootstrap.min.js',
	'elements/js/Sortable.js',
	'elements/js/owl.carousel.min.js',
	'elements/js/jquery.easy-pie-chart.js',
	'elements/js/builder_main.js',
	'elements/js/main.js'
	];

export const finalTags = ['strong', 'b', 'em', 'i', 'small', 'mark', 'del', 'ins', 'sub', 'sup'];

/* Style Changers */
/**
 * @param  {Object} target
 */

export function applyContentEditable(target){
	if (target !== null) {
		target.contentEditable = "true";
	}
}

/**
 * @param  {Object} target
 */

export function generateButton(caption, className) {
	var idocument = getFrameHandler();
	var button = idocument.createElement('BUTTON');
	button.setAttribute('class', className);
	button.innerHTML = caption;
	return button;
}

/**
 * @param  {Object} target
 */

export function generateItemController(){
	var idocument = getFrameHandler();
	var controller = idocument.createElement('DIV');
	controller.setAttribute('class', 'btn-group btn-group-xs _vb_ctrler-item _vb_ctrler-item-group');
	controller.setAttribute('role', 'group');
	controller.appendChild(generateButton('<i class="fa fa-arrows _vb_ctrler-item"></i>', 'btn btn-info _vb_ctrler-item item-move'));
	controller.appendChild(generateButton('<i class="fa fa-pencil _vb_ctrler-item"></i>', 'btn btn-success _vb_ctrler-item item-edit'));
	controller.appendChild(generateButton('<i class="fa fa-trash _vb_ctrler-item"></i>', 'btn btn-danger _vb_ctrler-item item-remove'));
	return controller;
}

/**
 * @param  {Object} target
 */

export function getItemController(target){
	var itemController = target.getElementsByClassName('_vb_ctrler-item-group');
	if (itemController.length == 1)
		return itemController[0];
	else
		return false;
}

/**
 * @param  {Object} target
 */

export function styleEdit(target) {
	if (target && target.className) {
		const className = target.classList;
		if (!className.contains('_vb_cell-editing')) {
			target.classList.add('_vb_cell-editing');
		}
	}
}

/**
 * @param  {Object} target
 */

export function removeEditable(target) {
	if (target) {
		target.removeAttribute('contentEditable');
		target.classList.remove('_vb_element-editing');
	}
}

/**
 * @param  {Object} target
 */

export function setEditable(target) {
	if (target) {
		target.setAttribute('contentEditable', true);
		target.classList.add('_vb_element-editing');
		target.focus();
	}
}

/**
 * @param  {Object} target
 */
export function styleMouseOver(target) {
	if (target && target.className) {
		const className = target.classList;
		if (!className.contains('_vb_cell-editing')) {
			target.classList.add('_vb_cell-editing');
		}
	}
}

/**
 * @param  {Object} target
 */
export function styleMouseOut(target) {
	if (target && target.className) {
		target.classList.remove('_vb_cell-editing');
	}
}

/**
 * @param  {Object} target
 */
export function styleFocus(target){
	if (target && target.style) {
		target.style.outline = '-webkit-focus-ring-color auto 5px';
	}
}
/**
 * @param  {Object} target
 */
export function styleBlur(target){
	if (target && target.style) {
		target.style.outline = '';
	}
}

/**
 * @param  {Object} target
 */
export function styleClick(target) {
	if (target && target.style) {
		target.contentEditable = "true";
		target.style.outlineWidth = '2px';
		target.style.outlineColor = '#f00';
		target.style.outlineStyle = 'solid';
		target.style.outlineOffset = '2px';
		target.style.cursor = 'text';
		target.style.boxSizing = 'content-box';
		target.focus();
	}
}
/* end of style changers*/
/**
 */
export function removePlaceHolder(){
	var idocument = getFrameHandler();
	if (idocument) {
		var placeholder = idocument.getElementsByClassName('template_placeholder')[0];
		if (placeholder) {
			placeholder.remove();
		}
	}
}
/**
 * @param  {} src
 * @param  {} callback
 */
export function frameLoadScript(src, callback) {
	var idocument = getFrameHandler();
	if (idocument) {
		var s,
			r;
		r = false;
		s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = src;
		s.onload = s.onreadystatechange = function() {
			if ( !r && (!this.readyState || this.readyState == 'complete') ){
				r = true;
				callback();
			}
		};
		idocument.body.appendChild(s);
	}
}

/**
 * 
 */

export function loadScriptAsync(url) {
	var idocument = getFrameHandler();
    var s = idocument.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url;
    var x = idocument.getElementsByTagName('head')[0];
    x.appendChild(s);
}

/**
 */
export function getSelectedText() {
	var idocument = getFrameHandler();
	var iwindow = getWindowHandler();
    if (iwindow.getSelection) {
        return iwindow.getSelection().toString();
    } else if (idocument.selection) {
        return idocument.selection.createRange().text;
    }
    return "";
}
/**
 */
export function getFrameHandler(){
	var idocument = document.getElementById('frameWrapper').contentWindow.document;
	return idocument;
}
/**
 */
export function getWindowHandler(){
	var iwindow = document.getElementById('frameWrapper').contentWindow.window;
	return iwindow;
}
/**
 */
export function getWindowWrapper(){
	var iwindow = document.getElementById('frameWrapper');
	return iwindow;
}
export function getStyleHandler() {
	var stylesheet = document.getElementById('frameWrapper').contentWindow.document.head.getElementsByTagName('style')[0]; 
	return stylesheet;
}

export function addCSSRule(sheet, selector, rules, index) {
	if (!sheet) return false;
	if(typeof sheet.insertRule !== 'undefined') {
		for (var key in sheet.cssRules) {
			if (sheet.cssRules[key] && selector.toLowerCase() == sheet.cssRules[key].selectorText) {
				sheet.deleteRule(key);
			}
		}
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else if(typeof sheet.addRule !== 'undefined') {
		for (var key in sheet.cssRules) {
			if (sheet.cssRules[key] && selector.toLowerCase() == sheet.cssRules[key].selectorText) {
				sheet.removeRule(key);
			}
		}
		sheet.addRule(selector, rules, index);
	}
}
/**
 */
export function loadResource(){
	var idocument = getFrameHandler();
	if (typeof idocument === 'undefined') {
		return;
	}
}
/**
 */
export function getPlaceHolder(){
	var idocument = getFrameHandler();
	return idocument.getElementsByClassName('template_placeholder')[0];
}
/**
 */
export function getPageList(){
	var idocument = getFrameHandler();
	return idocument.getElementsByClassName('page_list')[0];
}
/**
 */
export function getSortable(){
	var idocument = getFrameHandler();
	return idocument.getElementById('templateWrapper');
}
/**
 */
export function addPlaceHolder(){
	var idocument = getFrameHandler();
	var newTemplate = idocument.createElement('LI');
	newTemplate.setAttribute('class', 'template_placeholder');
	return newTemplate;
}
/**
 */
export function contentEditable(){
	var idocument = getFrameHandler();
	var editables = idocument.getElementsByClassName('editContent');
	for(var edit of editables) {
		if (typeof edit.style !== 'undefined' && edit.contentEditable != "true")
			edit.contentEditable = "true";
	}
}
/**
 * @param  {} blockEditor
 */

export function sectionUpdate(blockEditor) {
	const target = blockEditor.editTarget;
	if (target === null) return false;
	const templateContainer = target.getElementsByClassName('template-container')[0];
	const page = templateContainer.children[0];
	const board = page.children[0];
	if (!board || board.getAttribute('id') === null) return false;
	board.style.paddingLeft = blockEditor.paddingL;
	board.style.paddingRight = blockEditor.paddingR;
	board.style.paddingTop = blockEditor.paddingT;
	board.style.paddingBottom = blockEditor.paddingB;
	board.style.marginLeft = blockEditor.marginL;
	board.style.marginRight = blockEditor.marginR;
	board.style.marginTop = blockEditor.marginT;
	board.style.marginBottom = blockEditor.marginB;
	const bgColor = blockEditor.bgColor;
	board.style.backgroundColor = 'rgba('+bgColor.r+', '+bgColor.g+', '+bgColor.b+', '+bgColor.a+')';
	
	return false;
}

export function getStyleSelector(target) {
	var e = target;
	var selector = [];
	var counter = 0;
	while (e && e.className !== 'template-container' && counter <= 2) {
		counter ++;
		var className = '';
		if (e && e.className !== '') {
			if (e.classList.contains('editContent')) {
				className = e.tagName;
			} else {
				className = '.' + e.classList[0]; 
			}
		}
		else if (e.id !== '') {
			className = '#' + e.id;
		}
		else {
			className = e.tagName;
		}
		selector.push(className);
		e = e.parentNode;
	}
	return selector.reverse().join(' ');
}

/**
 * @param  {} styleEditor
 */
export function contentUpdate(styleEditor) {
	var target = styleEditor.editTarget;
	if (!target) return false;
	var styleHandler = getStyleHandler().sheet;
	var styleSelector = getStyleSelector(target);
	console.log(styleHandler);
	var editorType = styleEditor.editorType;
	switch (editorType) {
		case 'text':{
			var textAlign = getTextAlign(styleEditor.alignMode);
			var fontSize = styleEditor.fontSize + 'px';
			var color = 'rgba('+styleEditor.fontColor.r+', '+styleEditor.fontColor.g+', '+styleEditor.fontColor.b+', '+styleEditor.fontColor.a+')';
			var fontFamily = getFontName(styleEditor.fontName);
			addCSSRule(styleHandler, styleSelector, 'text-align:' + textAlign + ';font-size:' + fontSize + ';color:' + color + ';font-family:' + fontFamily + ';');
			break;
		}
		case 'button': {
            var textAlign = getTextAlign(styleEditor.alignMode);
			var fontSize = styleEditor.fontSize + 'px';
			var color = 'rgba('+styleEditor.fontColor.r+', '+styleEditor.fontColor.g+', '+styleEditor.fontColor.b+', '+styleEditor.fontColor.a+')';
			addCSSRule(styleHandler, styleSelector, 'text-align:' + textAlign + ';font-size:' + fontSize + ';color:' + color);
			if (styleEditor.iconValue && styleEditor.iconValue.glyphIcon)
				target.setAttribute('class', styleEditor.iconValue.glyphIcon);
			if (styleEditor.linkValue && styleEditor.linkValue.curUrl)
				target.setAttribute('HREF', styleEditor.linkValue.curUrl);
			if (styleEditor.linkValue && styleEditor.linkValue.textToDisplay)
				target.innerHTML = styleEditor.linkValue.textToDisplay;
			break;
		}
		case 'menu': {
            var textAlign = getTextAlign(styleEditor.alignMode);
			var fontSize = styleEditor.fontSize + 'px';
			var color = 'rgba('+styleEditor.fontColor.r+', '+styleEditor.fontColor.g+', '+styleEditor.fontColor.b+', '+styleEditor.fontColor.a+')';
			addCSSRule(styleHandler, styleSelector, 'text-align:' + textAlign + ';font-size:' + fontSize + ';color:' + color);
			if (styleEditor.iconValue && styleEditor.iconValue.glyphIcon)
				target.setAttribute('class', styleEditor.iconValue.glyphIcon);
			if (styleEditor.linkValue && styleEditor.linkValue.curUrl)
				target.setAttribute('HREF', styleEditor.linkValue.curUrl);
			if (styleEditor.linkValue && styleEditor.linkValue.textToDisplay)
				target.innerHTML = styleEditor.linkValue.textToDisplay;
			break;
		}
		case 'icon': {
			var fontSize = styleEditor.fontSize + 'px';
			var color = 'rgba('+styleEditor.fontColor.r+', '+styleEditor.fontColor.g+', '+styleEditor.fontColor.b+', '+styleEditor.fontColor.a+')';
			addCSSRule(styleHandler, styleSelector, 'font-size:' + fontSize + ';color:' + color);
			if (styleEditor.iconValue && styleEditor.iconValue.glyphIcon)
				target.setAttribute('class', styleEditor.iconValue.glyphIcon);
			break;
		}
		case 'image': {
			if (target.tagName == 'IMG'){
				target.setAttribute('src', styleEditor.imageValue);
				target.setAttribute('alt', styleEditor.imageAltText);
			}
			else if (styleEditor.iconValue)
				target.setAttribute('class', styleEditor.iconValue);
			break;
		} 
		case 'textlink': {
			var fontWeight = styleEditor.fontWeight;
			addCSSRule(styleHandler, styleSelector, 'font-weight:' + fontWeight );
			if (styleEditor.fontStyle)
				target.style.fontStyle = styleEditor.fontStyle;
			if (styleEditor.linkValue){
				target.setAttribute('HREF', styleEditor.linkValue.curUrl);
				target.innerHTML = styleEditor.linkValue.textToDisplay;
			}
			break;
		}
		default:
			break;
	}
	return false;
}

export function insertAtCursor(myField, myValue) {
	var idocument = getFrameHandler();
    //IE support
    if (idocument.selection) {
        myField.focus();
		let sel = idocument.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
            + myValue
            + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.innerHTML += myValue;
    }
}

/**
 * Add Slug
 */
export function addSlug(target, slugContent) {
	let slug = '{{' + slugContent + '}}';
	this.insertAtCursor(target, slug);
}

/**
 * Add Shortcode
 */
export function addShortcode(target, shortcode, html){
	if (!target) return;
	const idocument = getFrameHandler();
	let dynamicContainer = idocument.createElement('DIV');
	let dynamicCover = idocument.createElement('DIV');
	dynamicContainer.innerHTML = html;
	dynamicContainer.setAttribute('class', '_vb_dynamic-element container_dynamic');
	dynamicContainer.setAttribute('data-title', atob(shortcode));
	if (shortcode) {
		const code = atob(shortcode);
		let regex = /id="([^"]+)"/i;
		let match = regex.exec(code);
		let editUrl = '';
		const id = match[1];
		if (code.indexOf('form') !== -1) {
			editUrl = editDynamicForm + id;
		}
		else if (code.indexOf('block') !== -1) {
			editUrl = editStaticBlock + id;			
		}
		else if (code.indexOf('post') !== -1) {
			if (code.indexOf('Blog') !== -1) {
				editUrl = editPost + id;
			}
			else if (code.indexOf('Event') !== -1) {
				editUrl = editEvent + id;
			}
			else if (code.indexOf('Promotion') !== -1) {
				editUrl = editPromotion + id;
			}
			else {
				editUrl = editPost + id;
			}
		}
		else if (code.indexOf('slider') !== -1) {
			editUrl = editSlider + id;
		}
		dynamicContainer.setAttribute('data-editurl', editUrl);
	}
	dynamicContainer.setAttribute('label', shortcode);
	dynamicCover.setAttribute('class', '_vb_dynamic-cover');
	dynamicContainer.insertBefore(dynamicCover, dynamicContainer.firstChild);
	insertAfter(dynamicContainer, target);
}

/**
 * @param  {} target
 */
export function styleEditorPos(target, direction = 'top'){
	if (!target) return;
	var idocument = getFrameHandler();
	var iwindow = getWindowHandler();
	var editor = idocument.getElementById('styleEditor');
	var toolTip = idocument.getElementById('tooltip-top');
	var pos = target.getBoundingClientRect();
	var width = pos.right - pos.left;
	if (editor) {
		var editorWidth;
		if (toolTip)
			editorWidth = toolTip.offsetWidth;
		else
			editorWidth = 148;
		editor.style.position = "absolute";
		editor.style.display = "inline-block";
		editor.style.zIndex = "9999";
		editor.style.width = "auto";
		var scrollTop = iwindow.pageYOffset || idocument.documentElement.scrollTop || idocument.body.scrollTop || 0;
		if (direction == 'top') {
			editor.style.left = parseInt(pos.left + width/2 - editorWidth/2) + 'px';
			editor.style.top = parseInt(scrollTop + pos.top - 50) + 'px';
		}
		else {
			editor.style.left = parseInt(pos.left + width/2 - editorWidth/2) + 'px';
			editor.style.top = parseInt(scrollTop + pos.bottom) + 'px';
		}
	}
}

/**
 * 
 */
export function generateUniqueId() {

}
/**
 * @param  {} target
 */
export function blockEditorPos(target){
	if (!target) return;
	var idocument = getFrameHandler();
	var editor = idocument.getElementById('sectionSetting');
	var pos = target.getBoundingClientRect();
	var scrollTop = iwindow.pageYOffset || idocument.documentElement.scrollTop || idocument.body.scrollTop || 0;
	if (editor) {
		editor.style.position = "absolute";
		editor.style.display = "inline-block";
		editor.style.zIndex = "9999";
		editor.style.right = "0px";
		editor.style.top = parseInt(scrollTop + pos.top + 50) + "px";
	}
}
/**
 * @param {HTMLElement} element
 */
export function getStyleInfo(element, pseudo) {
	if (typeof element === 'undefined') {
		return false;
	}
	else {
		var iwindow = getWindowHandler();
		var style = iwindow.getComputedStyle(element, pseudo);
		return style;
	}
}

/**
 * @param {String} id id of template block
 */
export function getBlockInfo(id) {
	let idocument = getFrameHandler();
	var iwindow = getWindowHandler();
	const obj = idocument.getElementById(id);
	const templateContainer = obj.getElementsByClassName('template-container')[0];
	const page = templateContainer.children[0];
	const board = page.children[0];
	if (board && board.getAttribute('id') !== null){
		var style = iwindow.getComputedStyle(board, null);
		return style;
	}
	else {
		let newStyle = {};
		newStyle.paddingLeft = '0';
		newStyle.paddingRight = '0';
		newStyle.paddingTop = '0';
		newStyle.paddingBottom = '0';
		newStyle.marginLeft = '0';
		newStyle.marginRight = '0';
		newStyle.marginTop = '0';
		newStyle.marginBottom = '0';
		newStyle.backgroundImage = '';
		newStyle.backgroundColor = 'rgba(0,0,0,0)';
		return newStyle;
	}
}

/**
 * @param {String} Get Source code by id
 */
export function getSourceCode(id) {
	let idocument = getFrameHandler();
	const container = idocument.getElementById(id);
	if (container.getAttribute('data-dynamic')) {
		const dynamic = container.getAttribute('data-dynamic');
		if (dynamic == "true") {
			return container.innerHTML;
		}
		return container.getElementsByClassName('template-container')[0].innerHTML; 
	}
	return container.getElementsByClassName('template-container')[0].innerHTML;
}

/**
 * @param {String} Get Source code by id
 */
export function setSectionCode(id, newCode) {
	let idocument = getFrameHandler();
	const container = idocument.getElementById(id);
	container.getElementsByClassName('template-container')[0].innerHTML = newCode;
}

/**
 * @param {String} id get section from id
 */
export function getSection(id) {
	let idocument = getFrameHandler();
	let obj = idocument.getElementById(id);
	if (obj){
		return obj;
	}
	else {
		return false;
	}
}

/**
 * Get Dynamic Form Info
 */
export function getDynamicForm(target) {
	const title = target.getAttribute('data-title');
	const shortcode = target.getAttribute('label');
	const code = atob(shortcode.toString());
	const regex = /id="([^"]+)"/i;
	let editUrl = '';
	let match, id;
	match = regex.exec(code);
	id = match[1];
	if (code.indexOf('form') !== -1) {
		editUrl = editDynamicForm + id;
	}
	else if (code.indexOf('block') !== -1) {
		editUrl = editStaticBlock + id;			
	}
	else if (code.indexOf('post') !== -1) {
		if (code.indexOf('Blog') !== -1) {
			editUrl = editPost + id;
		}
		else if (code.indexOf('Event') !== -1) {
			editUrl = editEvent + id;
		}
		else if (code.indexOf('Promotion') !== -1) {
			editUrl = editPromotion + id;
		}
		else {
			editUrl = editPost + id;
		}
	}
	else if (code.indexOf('slider') !== -1) {
		editUrl = editSlider + id;
	}
	else {
		editUrl = editCustom + shortcode;
	}

	switch (code) {
		case 'MenuItems':
		break;
		case 'DisplayRecords':
		break;
		case 'Comments':
		break;
		default:
			
		break;
	}
	
	return {
		title: code,
		code: shortcode,
		editUrl: editUrl
	};
}

/**
 * 
 */
export function insertAfter(newNode, referenceNode) {
	if (referenceNode.nextSibling) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}
}

/**
 * @param  {} rgb
 */
export function rgb2hex(rgb){
	rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
	return (rgb && rgb.length === 4) ? "#" +
	("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

export function rgb2obj(rgb) {
	var rgbObj = /rgb\((\d+), (\d+), (\d+)\)/.exec(rgb);
	return {
		r:rgbObj[1],
		g:rgbObj[2],
		b:rgbObj[3],
		a:'1'
	};
}

/**
 */
export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/**
 * @param  {} target
 */
export function setDragState(target) {
	if (target)
		target.position = 'fixed';
}

/**
 * @param  {} target
 * @param  {} initialOffset
 * @param  {} offset
 */
export function setDragPos(target, initialOffset, offset) {
	if (target && target.style){
		target.style.position = 'fixed';
		target.style.width = '100%';
		target.style.backgroundColor = '#fff';
		target.style.zIndex = '10000';
		target.style.display = 'block';
		target.style.left = initialOffset.x + offset.x + 'px';
		target.style.top = initialOffset.y + offset.y + 'px';
	}
}

/**
 * @param  {} target
 */
export function unsetDragPos(target) {
	if (target) {
		target.style.position = '';
		target.style.width = '';
	}
	
}

/**
 * @param  {} mousePos
 * @param  {} startPos
 */
export function getDragOffset(mousePos, startPos) {
	return {
		x : (mousePos.clientX - startPos.x),
		y : (mousePos.clientY - startPos.y) 
	};
}

/**
 * @param  {} styleObj
 */
export function getAlignMode(styleObj) {
	let alignMode = styleObj.textAlign;
	switch (alignMode){
		case 'left':
			return 0;
		case 'center':
			return 1;
		case 'right':
			return 2;
		default:
			return 0;
	}	
}

/**
 * @param  {} alignMode
 */
export function getTextAlign(alignMode) {
	var textAlign;
	switch(alignMode){
		case 0:
			textAlign = 'left';
			break;
		case 1:
			textAlign = 'center';
			break;
		case 2:
			textAlign = 'right';
			break;
		default:
			textAlign = 'left';
			break;
	}
	return textAlign;
}
/**
 */
export function adjustIframeHeight(){
	var iwindow = getWindowWrapper();
	iwindow.height = parseInt(window.outerHeight - 270) + 'px';
}

/**
 * 
 */
export function getTemplateHandlerById(index){
	var idocument = getFrameHandler();
	var templateContainer = idocument.getElementById(index);
	if (typeof templateContainer.getElementsByClassName('template-container')[0] !== 'undefined')
		return templateContainer.getElementsByClassName('template-container')[0];
	else
		return null;
}

/**
 * Scroll To Animate
 */
export function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

/**
 * 
 */
export function scrollTop(){
	const iwindow 	= getWindowHandler();
	const idocument = getFrameHandler();
	var scrollTop = (iwindow.pageYOffset !== undefined) ? iwindow.pageYOffset : (idocument.documentElement || idocument.body.parentNode || idocument.body).scrollTop;
	return scrollTop;
}

/**
 * 
 */

export function dragScroll(target){
	const idocument = getFrameHandler();
	let clientRect 	= target.getBoundingClientRect();
	let clientY 	= clientRect.top;
	let x 			= idocument.body.scrollHeight - 50;
	let y 			= scrollTop();
	if (clientY > x) {
		scrollTo(idocument, 300, 600);
	}
	if (clientY < y) {
		scrollTo(idocument, 0, 600);
	} 
}

/**
 * 
 */
export function isElementIcon(target){
	if (!target) return false;
	if (target.tagName == 'SPAN' || target.tagName == 'I'){
		if (target.className.indexOf('fa ') !== -1) {	// font awesome
			return true;
		}
		else return false;
	}
	else return false;
}

/**
 * 
 */
export function isBlockController(target, type = ''){
	if (!target) return false;
	if (target.className.indexOf('_vb_ctrler-item') !== -1) {
		if (type == '')
			return true;
		else {
			if (target.className.indexOf(type) !== -1)
				return true;
			else
				return false;
		}
	}
	else return false;
}

/**
 * 
 */
export function isElementColDelete(target) {
	if (!target) return false;
	if (target.className.indexOf('_vb_col-ctrler') !== -1) {
		if (target.className.indexOf('remove') !== -1) {
			return true;
		}
		return false;
	}
	return false;
}

/**
 * @param  {Object} target
 */
export function isElementImage(target) {
	if (!target) return false;
	if (target.tagName == 'IMG')
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementAnchor(target) {
	if (!target) return false;
	if (target.tagName == 'A' && !isBlockController(target)) {
		return true;
	}
	else return false;
}

/**
 * @param  {Object} target
 */
export function isElementMenu(target) {
	if (!target) return false;
	if (isElementAnchor(target)) {
		if (target.parentElement && target.parentElement.parentElement.className.indexOf('navbar-nav') !== -1) 
			return true;
		else
			return false;
	}
	else return false;
}

/**
 * @param  {Object} target
 */
export function isElementButton(target) {
	if (!target) return false;
	if (isElementAnchor(target)) {
		if (target.classList.contains('btn') ||
			target.classList.contains('button')) 
			return true;
		else
			return false;
	}
	else return false;
}

/**
 * @param  {Object} target
 */
export function isElementList(target) {
	if (!target) return false;
	if (isElementAnchor(target)) {
		if (target.parentElement && target.parentElement.tagName == 'LI') 
			return true;
		else
			return false;
	}
	else return false;
}

/**
 * @param  {Object} target
 */
export function isElementParagraph(target) {
	if (!target) return false;
	if (target.tagName == 'P')
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementHeading(target) {
	if (target.tagName == 'H1' || target.tagName == 'H2' || target.tagName == 'H3' || target.tagName == 'H4' || target.tagName == 'H5')
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementItalic(target) {
	if (!target) return false;
	if (target.tagName.toString().toUpperCase() === 'I' && target.classList.length === 0)
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementBold(target) {
	if (!target) return false;
	if ((target.tagName.toString().toUpperCase() == 'STRONG' || target.tagName.toString().toUpperCase() == 'B') &&
	target.classList.length === 0)
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementPre(target) {
	if (!target) return false;
	if (target.tagName.toString().toUpperCase() == 'PRE')
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementSmall(target) {
	if (!target) return false;
	if (target.tagName.toString().toUpperCase() == 'SMALL')
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementSpan(target) {
	if (!target) return false;
	if (target.tagName.toString().toUpperCase() == 'SPAN' && target.classList.length === 0)
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function hasClassEdit(target) {
	if (target.className.indexOf('editContent') !== -1)
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementEditable(target) {
	if (!target) return false;
	if (isElementHeading(target) || 
		isElementParagraph(target) ||
		isElementBold(target) ||
		isElementItalic(target) ||
		isElementPre(target) ||
		isElementSmall(target) || 
		isElementSpan(target) ||
		hasClassEdit(target)) {
		return true;
	}
	else return false;
}

/**
 * @param  {Object} target
 */
export function isElementColumn(target) {
	if (!target) return false;
	const colArr = ['col-md-2', 'col-md-3', 'col-md-4', 'col-md-5', 'col-md-6', 'col-md-7', 'col-md-8', 'col-md-9',
					'col-xs-2', 'col-xs-3', 'col-xs-4', 'col-xs-5', 'col-xs-6', 'col-xs-7', 'col-xs-8', 'col-xs-9',
					'col-lg-2', 'col-lg-3', 'col-lg-4', 'col-lg-5', 'col-lg-6', 'col-lg-7', 'col-lg-8', 'col-lg-9'];
	if (target.classList) {
		const classArr = target.classList;
		let isColumn = false;
		classArr.forEach((className) => {
			if (className.indexOf('col-') !== -1) {
				isColumn = true;
			}
		});
		if (isColumn) return target;
	}
	let column = getParentTags(target, colArr);
	if (column != null) {
		return column;
	}
	else {
		return false;
	}
 }

 export function getParentTags(el, tagArr) {
    while (el) {
		el = el.parentNode;
		if (el && el.classList) {
			const classArr = el.classList;
			let _elClass = false;
			classArr.forEach((className) => {
				if (className.indexOf('col-') !== -1) {
					_elClass = className;
				}
			});
			if (el && tagArr.indexOf(_elClass) !== -1)
				return el;
		}
    }
    return null;
}

export function hasChild(target) {
	return target.hasChildNodes();
}

export function getFontName(fontFamilyName) {
	if (fontFamilyName) {
		const fontArr = fontFamilyName.toString().split(',');
		return fontArr[0];
	}
	return false;
}

/**
 * @param  {Object} target
 */
export function isElementInput(target) {
	if (!target) return false;
	if (target.tagName == 'INPUT') {
		if (target.getAttribute('type') == 'SUBMIT' || target.getAttribute('type') == 'BUTTON')
			return true;
		else
			return false;
	}
	else return false;
}

/**
 * @param  {Object} target
 */

export function isElementDiv(target) {
	if (!target) return false;
	if (target.tagName == 'DIV' && !hasClassEdit(target))
		return true;
	else
		return false;
}

/**
 * @param  {Object} target
 */
export function isElementDynamic(target) {
	if (target && (target.classList.contains('container_dynamic') || target.classList.contains('container_slug') || target.classList.contains('dynamic_custom_html'))) {
		const shortcode = target.getAttribute('label');
		if (shortcode && shortcode !== '') {
			return true;
		}
		return false;
	}
	return false;
}

export function getParentTag(el, tag) {
    while (el) {
		el = el.parentNode;
		if (el && el.classList) {
			const classArr = el.classList;
			let _elClass = false;
			classArr.forEach((className) => {
				if (className == tag) {
					_elClass = className;
				}
			});
			if (el && tag == _elClass)
				return el;
		}
    }
    return false;
}

/**
 * @param  {Object} target
 */

export function duplicateElement(target) {
	if (target){
		var duplicate;
		if (target.parentElement.tagName == 'LI') {
			duplicate = target.parentElement.cloneNode(true);
			insertAfter(duplicate, target.parentElement);
		}
		else {
			duplicate = target.cloneNode(true);
			insertAfter(duplicate, target);
		}
	}
}

/**
 * @param  {Object} target
 */

export function removeElement(target) {
	if (target) {
		if (target.parentElement.tagName == 'LI' && !target.nextSibling) {
			target.parentElement.parentNode.removeChild(target.parentElement);
		}
		else {
			target.parentNode.removeChild(target);
		}
	}
}

export function getPageName(){
	var url = location.search;
	var pageName = 'body';
	if (url != ''){
		var captured = /name=([^&]+)/.exec(url)[1]; // Value is in [1] ('384' in our case)
		pageName = captured ? captured : 'body';
	}
	return pageName;
}
