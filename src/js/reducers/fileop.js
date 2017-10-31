import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	isLoaded : false,
	isSaved : false,
	isFetching : false,
	loadedContent : '',
	error : []
};

function fileop(state = initialState, action) {
	if (action.itemType !== 'fileop') {
		return state;
	}

	switch (action.type) {
		case actionTypes.LOAD_FILE_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isLoaded: false,
				isSaved: false,
				loadedContent: '',
				error: []
			});
		case actionTypes.LOAD_FILE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				isLoaded: true,
				loadedContent: action.content
			});
		case actionTypes.LOAD_FILE_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				isLoaded: false,
				error: action.error
			});
		case actionTypes.SAVE_FILE_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				isLoaded: false,
				isSaved: false,
				loadedContent: '',
				error: []
			});
		case actionTypes.SAVE_FILE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				isSaved: true
			});
		case actionTypes.SAVE_FILE_ERROR:
			return Object.assign({}, state, {
				isFetching: false,
				isSaved: false,
				error: action.error
			});
		default:
			return state;
	}
}

const undoableFileOp = undoable(fileop, {
  filter: distinctState()
});

export default undoableFileOp;