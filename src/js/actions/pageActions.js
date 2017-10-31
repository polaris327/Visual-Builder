import {
	TEMPLATE_INSERT_RECEIVED, TEMPLATE_ORDER_CHANGE, 
	TEMPLATE_UPDATE,TEMPLATE_GET_REQUEST, TEMPLATE_GET_RECEIVED, TEMPLATE_GET_ERROR , TEMPLATE_DELETE, TEMPLATE_ON_DRAG, PAGE_EMPTY, PAGE_SPLICE_BLOCK,
	TEMPLATE_HEAD_REQUEST, TEMPLATE_HEAD_RECEIVED, TEMPLATE_HEAD_ERROR, PAGE_PUBLISH, UPDATE_STYLE, TEMPLATE_STORE
} from '../constants/actionTypes';

import { PUBLISH_URL, STORE_SECTION_URL } from '../constants/urlNames';

export function insertTemplate(id, index, block) {
	return {
		type: TEMPLATE_INSERT_RECEIVED,
		itemType: 'page',
		url:block.url,
		dynamic: block.dynamic,
		shortcode: block.shortcode,
		id:id,
		index:index
	};
}

export function getTemplateRequest(index, url) {
	return {
		type : TEMPLATE_GET_REQUEST,
		itemType: 'page',
		index : index,
		url : url
	};
}

export function getTemplateReceived(index, url, html) {
	return {
		type: TEMPLATE_GET_RECEIVED,
		itemType: 'page',
		url:url,
		index:index,
		html:html
	};
}

export function getTemplateError(error) {
	return {
		type: TEMPLATE_GET_ERROR,
		itemType: 'page',
		error:error
	};
}

export function insertHeadRequest() {
	return {
		type: TEMPLATE_HEAD_REQUEST,
		itemType: 'page'
	};
}

export function insertHeadReceived(header) {
	return {
		type 		: TEMPLATE_HEAD_RECEIVED,
		itemType 	: 'page',
		headerString:header
	};
}

export function insertHeadError(error) {
	return {
		type: TEMPLATE_HEAD_ERROR,
		itemType: 'page',
		error:error
	};
}

export function changeOrderTemplate(index, destIndex) {
	return {
		type 	: TEMPLATE_ORDER_CHANGE,
		itemType: 'page',
		index 	:index,
		destIndex:destIndex
	};
}

export function updateTemplate(id, index, html) {
	return {
		type: TEMPLATE_UPDATE,
		itemType: 'page',
		id:id,
		index:index,
		html
	};
}

export function deleteTemplate(index) {
	return {
		type: TEMPLATE_DELETE,
		itemType: 'page',
		index:index
	};
}

export function setTemplateDrag(dragTemplate) {
	return {
		type: TEMPLATE_ON_DRAG,
		itemType:'page',
		dragTemplate:dragTemplate
	};
}

export function emptyPage() {
	return {
		type: PAGE_EMPTY,
		itemType: 'page'
	};
}

export function spliceBlock(index1, index2) {
	return {
		type: PAGE_SPLICE_BLOCK,
		itemType: 'page',
		index1,
		index2
	};
}

export function storeTemplate(html) {
	try {
		storeSectionRequest(html);
	}
	catch(e) {
		console.log(e);
	}
	return {
		type: TEMPLATE_STORE,
		itemType: 'page'
	};
}

export function publishPage(pageName) {
	try {
		publishPageRequest(pageName);
	}
	catch (e) {
		console.log(e);
	}
	return {
		type: PAGE_PUBLISH,
		itemType: 'page'
	};
}

export function updateStyle(newStyle) {
	return {
		type: UPDATE_STYLE,
		itemType: 'page',
		newStyle
	};
}

async function publishPageRequest(pageName) {
	let config = {
		'credentials': 'same-origin',
		'mode': 'no-cors',
		'method': 'POST',
		'headers': { 'Content-Type':'text/html' },
		'body' : 'location='+pageName
	};

	const response = await fetch(PUBLISH_URL, config);
	return response.ok;
	
}

async function storeSectionRequest(html) {
	let config = {
		'credentials': 'same-origin',
		'mode': 'no-cors',
		'method': 'POST',
		'headers': { 'Content-Type':'text/html' },
		'body' : 'section='+html
	};
	const response = await fetch(STORE_SECTION_URL, config);
	return response.ok;
}
