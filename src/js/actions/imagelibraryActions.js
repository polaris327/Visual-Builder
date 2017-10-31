import { 
	LOAD_LIBRARY_IMAGE_REQUEST, LOAD_LIBRARY_IMAGE_RECEIVE, LOAD_LIBRARY_IMAGE_ERROR,
	UPLOAD_LIBRARY_IMAGE_REQUEST, UPLOAD_LIBRARY_IMAGE_RECEIVE, UPLOAD_LIBRARY_IMAGE_ERROR,
	REMOVE_LIBRARY_IMAGE_REQUEST, REMOVE_LIBRARY_IMAGE_RECEIVE, REMOVE_LIBRARY_IMAGE_ERROR
 } from '../constants/actionTypes';

export function requestImageLibrary(path) {
	return {
		type: LOAD_LIBRARY_IMAGE_REQUEST,
		itemType: 'imagelibrary',
		path: path,
		isFetching : true
	};
}

export function receiveImageLibrary(images) {
	return {
		type: LOAD_LIBRARY_IMAGE_RECEIVE,
		itemType: 'imagelibrary',
		isFetching: false,
		images
	};
}

export function loadImageLibraryErr(errs) {
	return {
		type: LOAD_LIBRARY_IMAGE_ERROR,
		itemType: 'imagelibrary',
		isFetching: false,
		errors: errs
	};
}

export function requestImageUpload(file) {
	return {
		type: UPLOAD_LIBRARY_IMAGE_REQUEST,
		itemType: 'imagelibrary',
		isFetching : true,
		file
	};
}

export function imageUploadSuccessful(image) {
	return {
		type: UPLOAD_LIBRARY_IMAGE_RECEIVE,
		itemType: 'imagelibrary',
		isFetching: false,
		image
	};
}

export function imageUploadFailed(errs) {
	return {
		type: UPLOAD_LIBRARY_IMAGE_ERROR,
		itemType: 'imagelibrary',
		isFetching: false,
		errors: errs
	}
}

export function requestImageRemove(file) {
	return {
		type: REMOVE_LIBRARY_IMAGE_REQUEST,
		itemType: 'imagelibrary',
		isFetching : true,
		file
	};
}

export function imageRemoveSuccessful(image) {
	return {
		type: REMOVE_LIBRARY_IMAGE_RECEIVE,
		itemType: 'imagelibrary',
		isFetching: false,
		image
	};
}

export function imageRemoveFailed(errs) {
	return {
		type: REMOVE_LIBRARY_IMAGE_ERROR,
		itemType: 'imagelibrary',
		isFetching: false,
		errors: errs
	};
}