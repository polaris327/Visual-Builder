import { 
	LOAD_FILE_REQUEST, LOAD_FILE_RECEIVE, LOAD_FILE_ERROR,
	SAVE_FILE_REQUEST, SAVE_FILE_RECEIVE, SAVE_FILE_ERROR
 } from '../constants/actionTypes';

export function requestLoadFile(filename) {
	return {
		type: LOAD_FILE_REQUEST,
		itemType: 'fileop',
		isFetching : true,
		filename
	};
}

export function receiveLoadFile(content) {
	return {
		type: LOAD_FILE_RECEIVE,
		itemType: 'fileop',
		isFetching: false,
		content
	};
}

export function loadFileErr(errs) {
	return {
		type: LOAD_FILE_ERROR,
		itemType: 'fileop',
		isFetching: false,
		errors: errs
	};
}

export function requestSaveFile(filename, content) {
	return {
		type: SAVE_FILE_REQUEST,
		itemType: 'fileop',
		isFetching : true,
		filename,
		content
	};
}

export function receiveSaveFile() {
	return {
		type: SAVE_FILE_RECEIVE,
		itemType: 'fileop',
		isFetching: false
	};
}

export function saveFileErr(errs) {
	return {
		type: SAVE_FILE_ERROR,
		itemType: 'fileop',
		isFetching: false,
		errors: errs
	};
}