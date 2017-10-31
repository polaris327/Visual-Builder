import {PAGE_SPLICE_COLUMN} from '../constants/actionTypes';

export function spliceColumn(index1, index2) {
	return {
		type: PAGE_SPLICE_COLUMN,
		itemType: 'block',
		index1,
		index2
	};
}