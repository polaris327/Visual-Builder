import * as actions from '../constants/actionTypes';

export function requestTemplate() {
	return {
		type: actions.LEFTMENU_TEMPLATE_REQUEST,
		itemType: 'leftmenu',
		isFetching : true
	};
}

export function receiveTemplate(template) {
	return {
		type: actions.LEFTMENU_TEMPLATE_RECEIVE,
		itemType: 'leftmenu',
		isFetching: false,
		template:template
	};
}

export function loadError(errs) {
	return {
		type: actions.LEFTMENU_TEMPLATE_ERROR,
		itemType: 'leftmenu',
		isFetching: false,
		errors: errs
	};
}

export function requestPages() {
	return {
		type: actions.LEFTMENU_PAGES_REQUEST,
		itemType: 'leftmenu',
		isFetching: true
	}
}

export function receivePages(pages) {
	return {
		type: actions.LEFTMENU_PAGES_RECEIVE,
		itemType: 'leftmenu',
		isFetching: false,
		pages:pages
	}
}

export function loadPageError(errs) {
	return {
		type: actions.LEFTMENU_PAGES_ERROR,
		itemType: 'leftmenu',
		isFetching: false,
		errors: errs
	}
}


