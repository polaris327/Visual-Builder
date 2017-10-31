import { put, call, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	externalActions,
	leftmenuActions,
	pageActions,
	imagelibraryActions,
	fileopActions
} from '../actions';
import {
	loadTemplate,
	loadPages,
	loadExternals,
	loadGlobals,
	loadHead,
	loadHtml,
	loadImages,
	uploadImage,
	removeUploadedImage,
	loadFile,
	saveFile
} from '../service';

/*
 * Load Sidebar Templates
 */
function* callGetSideTemplate(){
	try {
		const result = yield call(loadTemplate);	
		yield put(leftmenuActions.receiveTemplate(result));
	} catch(e) {
		yield put(leftmenuActions.loadError(e));
	}
}

function* getSideTemplateSaga(){
	yield takeEvery("LEFTMENU_TEMPLATE_REQUEST", callGetSideTemplate);
}

/*
 * Update HTML from URL for page block
 */

function* callGetTemplate({index, url}){
	try {
		const html = yield call(loadHtml, url);	
		yield put(pageActions.getTemplateReceived(index, url, html));
	} catch(e) {
		yield put(pageActions.getTemplateError(e));
	}
}

function* getTemplateSaga(){
	yield takeEvery("TEMPLATE_GET_REQUEST", callGetTemplate);
}

/**
 * Load HTML Head from db
 */

function* callGetHead(){
	try {
		const head = yield call(loadHead);	
		yield put(pageActions.insertHeadReceived(head));
	} catch(e) {
		yield put(pageActions.insertHeadError(e));
	}
}

function* getHeadSaga(){
	yield takeLatest("TEMPLATE_HEAD_REQUEST", callGetHead);
}

/*
 * Load all images
 */
function* callLoadImageLibary({path}){
	try {
		const result = yield call(loadImages, path);
		yield put(imagelibraryActions.receiveImageLibrary(result));
	} catch(e) {
		yield put(imagelibraryActions.loadImageLibraryErr(e));
	}
}

function* loadImageLibrarySaga(){
	yield takeLatest("LOAD_LIBRARY_IMAGE_REQUEST", callLoadImageLibary);
}

/*
 * upload image
 */
function* callUploadImage({ file }) {
	try {
		const image = yield call(uploadImage, file);
		yield put(imagelibraryActions.imageUploadSuccessful(image));
	} catch(e) {
		yield put(imagelibraryActions.imageUploadFailed(e));
	}
}

function* uploadImageSaga(){
	yield takeLatest("UPLOAD_LIBRARY_IMAGE_REQUEST", callUploadImage);
}

/*
 * remove uploaded image
 */
function* callRemoveImage({ file }) {
	try {
		const image = yield call(removeUploadedImage, file);
		yield put(imagelibraryActions.imageRemoveSuccessful(image));
	} catch(e) {
		yield put(imagelibraryActions.imageRemoveFailed(e));
	}
}

function* removeImageSaga(){
	yield takeLatest("REMOVE_LIBRARY_IMAGE_REQUEST", callRemoveImage);
}

/*
 * save file
 */
function* callSaveFile({ filename, content }) {
	try {
		const code = yield call(saveFile, filename, content);
		yield put(fileopActions.receiveSaveFile());
	} catch(e) {
		yield put(fileopActions.saveFileErr(e));
	}
}

function* saveFileSaga(){
	yield takeLatest("SAVE_FILE_REQUEST", callSaveFile);
}

/*
 * load file
 */
function* callLoadFile({ filename }) {
	try {
		const content = yield call(loadFile, filename);
		yield put(fileopActions.receiveLoadFile(content));
	} catch(e) {
		yield put(fileopActions.loadFileErr(e));
	}
}

function* loadFileSaga(){
	yield takeLatest("LOAD_FILE_REQUEST", callLoadFile);
}

/**
 * Load Pages on left side menu
 */

function* callLoadPages() {
	try {
		const result = yield call(loadPages);	
		yield put(leftmenuActions.receivePages(result));
	} catch(e) {
		yield put(leftmenuActions.loadError(e));
	}
}

function* loadPagesSaga() {
	yield takeEvery("LEFTMENU_PAGES_REQUEST", callLoadPages);
}

/**
 * Load External Content (Shortcode, Forms, Widgets, Static Blocks etc)
 */

function* callLoadExternals() {
	try {
		const result = yield call(loadExternals);	
		yield put(externalActions.getExternalReceived(result));
	} catch(e) {
		yield put(externalActions.getExternalError(e));
	}
}

function* loadExternalsSaga() {
	yield takeEvery("TEMPLATE_EXTERNAL_REQUEST", callLoadExternals);
}

/**
 * Load External Content (Shortcode, Forms, Widgets, Static Blocks etc)
 */

function* callLoadGlobals() {
	try {
		const result = yield call(loadGlobals);	
		yield put(externalActions.getGlobalReceived(result));
	} catch(e) {
		yield put(externalActions.getGlobalError(e));
	}
}

function* loadGlobalsSaga() {
	yield takeEvery("TEMPLATE_GLOBAL_REQUEST", callLoadGlobals);
}

export default function* root() {
   yield [
		fork(getSideTemplateSaga),
		fork(getTemplateSaga),
		fork(loadImageLibrarySaga),
		fork(uploadImageSaga),
		fork(removeImageSaga),
		fork(saveFileSaga),
		fork(loadFileSaga),
		fork(getHeadSaga),
		fork(loadPagesSaga),
		fork(loadExternalsSaga),
		fork(loadGlobalsSaga)
   ]
}