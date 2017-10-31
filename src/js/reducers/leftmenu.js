import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	templates : {},
	pages 	: [],
	selectedTemplate : "",
	isFetching : false,
	error : []
};

function leftmenu(state = initialState, action) {
	if (action.itemType !== 'leftmenu') {
		return state;
	}
	switch (action.type) {
		case actionTypes.LEFTMENU_TEMPLATE_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case actionTypes.LEFTMENU_TEMPLATE_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				templates:action.template
			});
		case actionTypes.LEFTMENU_TEMPLATE_ERROR:
			return Object.assign({}, state, {
				isFetching: true,
				templates: {},
				error: action.error
			});
		case actionTypes.LEFTMENU_PAGES_REQUEST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case actionTypes.LEFTMENU_PAGES_RECEIVE:
			return Object.assign({}, state, {
				isFetching: false,
				pages:action.pages
			});
		case actionTypes.LEFTMENU_PAGES_ERROR:
			return Object.assign({}, state, {
				isFetching: true,
				pages: [],
				error: action.error
			});
		default:
			return state;
	}
}

const undoableLeftmenu = undoable(leftmenu, {
  filter: distinctState()
});

export default undoableLeftmenu;