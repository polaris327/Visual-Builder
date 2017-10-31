import * as actionTypes from '../constants/actionTypes';
import merge from 'lodash/merge';
import map from 'lodash/map';
import each from 'lodash/each';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	columnList : [],
	containerClass : "",
	fullWidth : false
};

function block(state = initialState, action) {
	if (action.itemType !== 'block') {
		return state;
	}

	switch (action.type) {
		case actionTypes.PAGE_SPLICE_COLUMN:
			var newState = state;
			newState.columnList.splice(action.index1, 0, newState.columnList.splice(action.index2, 1)[0]);
			return {
				...state,
				columnList: newState.columnList
			};
		default:
			return state;
	}
}

const undoableBlock = undoable(block, {
  filter: distinctState()
});

export default undoableBlock;