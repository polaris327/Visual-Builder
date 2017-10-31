import * as actionTypes from '../constants/actionTypes';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	externals : {},
	globals : {},
	isLoading : false
};

function external(state = initialState, action) {
	if (action.itemType !== 'externals' && action.itemType !== 'fileop') {
		return state;
	}

	switch (action.type) {
		case actionTypes.TEMPLATE_EXTERNAL_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			});
		case actionTypes.TEMPLATE_EXTERNAL_RECEIVED:
			return Object.assign({}, state, {
				externals: action.externals,
				isLoading : false
			});
		case actionTypes.TEMPLATE_EXTERNAL_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		case actionTypes.TEMPLATE_GLOBAL_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			});
		case actionTypes.TEMPLATE_GLOBAL_RECEIVED:
			return Object.assign({}, state, {
				globals: action.globals,
				isLoading : false
			});
		case actionTypes.TEMPLATE_GLOBAL_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		case actionTypes.TEMPLATE_INSERT_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			});
		default:
			return state;
	}
}

const undoablePage = undoable(external, {
  filter: distinctState()
});

export default undoablePage;