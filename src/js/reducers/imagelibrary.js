import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	images : [],
	uploadedImage : '',
	removedImage : '',
	isFetching : false,
	error : []
};

function imagelibrary(state = initialState, action) {
	if (action.itemType !== 'imagelibrary') {
		return state;
	}

	switch (action.type) {
		case actionTypes.LOAD_LIBRARY_IMAGE_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				uploadedImage: '',
				removedImage: ''
			});
		case actionTypes.LOAD_LIBRARY_IMAGE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: '',
				removedImage: '',
				images: action.images
			});
		case actionTypes.LOAD_LIBRARY_IMAGE_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: '',
				removedImage: '',
				images: [],
				error: action.error
			});
		case actionTypes.UPLOAD_LIBRARY_IMAGE_REQUEST:
			return Object.assign({}, state, {
				uploadedImage: '',
				removedImage: '',
				isFetching: true
			});
		case actionTypes.UPLOAD_LIBRARY_IMAGE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: action.image,
				removedImage: ''
			});
		case actionTypes.UPLOAD_LIBRARY_IMAGE_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: '',
				removedImage: '',
				error: action.error
			});
		case actionTypes.REMOVE_LIBRARY_IMAGE_REQUEST:
			return Object.assign({}, state, {
				uploadedImage: '',
				removedImage: '',
				isFetching: true
			});
		case actionTypes.REMOVE_LIBRARY_IMAGE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: '',
				removedImage: action.image
			});
		case actionTypes.REMOVE_LIBRARY_IMAGE_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				uploadedImage: '',
				removedImage: '',
				error: action.error
			});
		default:
			return state;
	}
}

const undoableImageLibrary = undoable(imagelibrary, {
  filter: distinctState()
});

export default undoableImageLibrary;