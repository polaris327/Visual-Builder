import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	screen : "desktop",
	pageTitle : "index",
	changes : false	
};

function header(state = initialState, action) {
	if (action.itemType !== 'header') {
		return state;
	}
	
	switch (action.type) {
		case actionTypes.PAGE_CHANGE_SCREENSIZE:
			return {
				...state,
				screen: action.screen
			};
		case actionTypes.PAGE_CHANGE_HAPPENED:
			return {
				...state,
				changes:true
			};
		case actionTypes.PAGE_CHANGE_TITLE:
			return {
				...state,
				pageTitle:action.pageTitle
			}
		default:
			return state;
	}
}

const undoableHeader = undoable(header, {
  filter: distinctState()
});

export default undoableHeader;