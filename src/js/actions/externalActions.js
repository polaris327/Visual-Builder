import {
    TEMPLATE_EXTERNAL_REQUEST,
    TEMPLATE_EXTERNAL_RECEIVED,
	TEMPLATE_EXTERNAL_ERROR,
	TEMPLATE_GLOBAL_REQUEST,
	TEMPLATE_GLOBAL_RECEIVED,
	TEMPLATE_GLOBAL_ERROR
} from '../constants/actionTypes';

export function getExternalRequest() {
	return {
		type: TEMPLATE_EXTERNAL_REQUEST,
		itemType: 'externals'
	};
}

export function getExternalReceived(externals) {
	return {
		type: TEMPLATE_EXTERNAL_RECEIVED,
		itemType: 'externals',
		externals:externals
	};
}

export function getExternalError(error) {
	return {
		type: TEMPLATE_EXTERNAL_ERROR,
		itemType: 'externals',
		error:error
	};
}

export function getGlobalRequest() {
	return {
		type: TEMPLATE_GLOBAL_REQUEST,
		itemType: 'externals'
	};
}

export function getGlobalReceived(globals) {
	return {
		type: TEMPLATE_GLOBAL_RECEIVED,
		itemType: 'externals',
		globals:globals
	};
}

export function getGlobalError(error) {
	return {
		type: TEMPLATE_GLOBAL_ERROR,
		itemType: 'globals',
		error:error
	};
}

