import * as actionTypes from '../constants/actionTypes';
import undoable, { distinctState } from 'redux-undo';

const initialState = {
	blockList : [],
	style: [],
	headerString : '',
	recentId : '',
	pageName : 'body',
	isLoading : false
};

function page(state = initialState, action) {
	if (action.itemType !== 'page' && action.itemType !== 'fileop') {
		return state;
	}

	switch (action.type) {
		case actionTypes.TEMPLATE_HEAD_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			});
		case actionTypes.TEMPLATE_HEAD_RECEIVED:
			return Object.assign({}, state, {
				headerString: action.headerString,
				isLoading : false
			});
		case actionTypes.TEMPLATE_HEAD_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		case actionTypes.TEMPLATE_INSERT_REQUEST:
			return Object.assign({}, state, {
				isLoading: true
			});
		case actionTypes.TEMPLATE_GET_REQUEST:
			var newState = JSON.parse(JSON.stringify(state));
			var index = action.index;
			var newBlockList = [...newState.blockList];
			return Object.assign({}, state, {
				isLoading : true,
				blockList : newBlockList
			});
		case actionTypes.TEMPLATE_INSERT_RECEIVED:
			var newState = JSON.parse(JSON.stringify(state));
			var index = action.index;
			var newBlockList = [];

			if (index == -1) {
				var block = {
					id : action.id,
					url : action.url,
					dynamic: action.dynamic,
					shortcode: action.shortcode
				};

				newBlockList = [...newState.blockList, block];
			} else if (index >= 0) {
				var block = {
					id : action.id,
					url : action.url,
					dynamic: action.dynamic,
					shortcode: action.shortcode
				};

				newBlockList = [...newState.blockList.slice(0, index), block, ...newState.blockList.slice(index)];
			} else {
				newBlockList = newState.blockList;
			}
			
			return Object.assign({}, state, {
				isLoading : false,
				blockList : newBlockList,
				recentId : action.id
			});
		case actionTypes.TEMPLATE_GET_RECEIVED:
			var newState = JSON.parse(JSON.stringify(state));
			var index = action.index;
			var newBlockList = [...newState.blockList];
			return Object.assign({}, state, {
				isLoading : false,
				blockList : newBlockList,
				recentId : action.id
			});
		case actionTypes.TEMPLATE_INSERT_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		case actionTypes.TEMPLATE_GET_ERROR:
			return Object.assign({}, state, {
				isLoading: false,
				error: action.error
			});
		case actionTypes.TEMPLATE_ORDER_CHANGE:
			var newState = JSON.parse(JSON.stringify(state));
			var index = action.index;
			var destIndex = action.destIndex;
			var newBlockList = [];

			if (typeof newState.blockList[index] !== 'undefined') {
				var block = newState.blockList[index];
				if (destIndex == -1) {
					newBlockList = JSON.parse(JSON.stringify(newState.blockList));
					newBlockList.splice(action.index, 1);
					newBlockList = [...newBlockList, block];
				} else if (destIndex >= 0) {
					newBlockList = JSON.parse(JSON.stringify(newState.blockList));
					newBlockList.splice(destIndex, 0, newBlockList.splice(index, 1)[0]);
				} else {
					newBlockList = newState.blockList;
				}

				return Object.assign({}, state, {
					isLoading: false,
					blockList: newBlockList
				});
			}

			return state;
		case actionTypes.TEMPLATE_UPDATE:
			var newState = JSON.parse(JSON.stringify(state));
			var id = action.id;
			var index = action.index;
			var newBlockList = [];
			
			if (typeof newState.blockList[index] !== 'undefined') {
				newBlockList = JSON.parse(JSON.stringify(newState.blockList));
				return Object.assign({}, state, {
					blockList: newBlockList
				});
			}
			
			return state;
		case actionTypes.TEMPLATE_DELETE:
			var newState = JSON.parse(JSON.stringify(state));
			var index = action.index;
			var newBlockList = [];

			if (typeof newState.blockList[index] !== 'undefined') {
				newBlockList = JSON.parse(JSON.stringify(newState.blockList));
				newBlockList.splice(action.index, 1);
				return Object.assign({}, state, {
					blockList: newBlockList
				});
			}
			
			return state;
		case actionTypes.LOAD_FILE_RECEIVE:
			if (action.content && action.content.blockList)
				return Object.assign({}, state, {
					isLoading: false,
					blockList: action.content.blockList,
					recentId: action.id
				});
			else
				return Object.assign({}, state, {
					isLoading: false,
					blockList: []
				});
		case actionTypes.PAGE_EMPTY:
			return Object.assign({}, state, {
					isLoading: false,
					blockList: [],
					recentId: ''
				});
		case actionTypes.UPDATE_STYLE:
			return Object.assign({}, state, {
					isLoading: false,
					style: action.style,
					recentId: ''
				});
		default:
			return state;
	}
}

const undoablePage = undoable(page, {
  filter: distinctState()
});

export default undoablePage;