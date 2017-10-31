import {
	PAGE_CHANGE_SCREENSIZE, PAGE_CHANGE_HAPPENED, PAGE_CHANGE_TITLE
} from '../constants/actionTypes';

export function changeScreenSize(screen) {
	return {
		type: PAGE_CHANGE_SCREENSIZE,
		itemType: 'header',
		screen
	};
}

export function changePageTitle(title) {
	return {
		type: PAGE_CHANGE_TITLE,
		itemType: 'header',
		title
	};
}

export function changeHappened() {
	return {
		type: PAGE_CHANGE_HAPPENED,
		itemType: 'header'
	};
}