import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	templates : [],
	selectedTemplate : "",
	isOpen : false
};

function stylepanel(state = initialState, action) {
	if (action.itemType !== 'stylepanel') {
		return state;
	}
	switch (action.type) {
		case actionTypes.MENU_SELECT_TEMPLATE:
			return {
				...state
			};
		default:
			return state;
	}
}

const undoableStylepanel = undoable(stylepanel, {
  filter: distinctState()
});

export default undoableStylepanel;