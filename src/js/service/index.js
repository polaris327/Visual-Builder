import {
	HEAD_ASSETS_URL,
	ELEMENTS_URL,
	ALL_PAGES_URL,
	IMAGES_URL,
	IMAGE_UPLOAD_URL,
	IMAGE_REMOVE_URL,
	PAGE_SECTION_URL,
	SAVE_PAGE_URL,
	GET_EXTERNAL_URL,
	GET_GLOBAL_SETTING_URL
} from '../constants/urlNames';

const htmlHeader = {
	'credentials': 'same-origin',
	'mode': 'no-cors',
	'method': 'GET',
	'headers': { 'Content-Type':'text/html' }
};

const jsonHeader = {
	'credentials': 'same-origin',
	'mode': 'no-cors',
	'method': 'GET',
	'headers': { 'Content-Type':'application/json' }
};

const postHeader = {
	'credentials': 'same-origin',
	'mode': 'no-cors',
	'method': 'POST'
};

export function loadHead() {
	return fetch(HEAD_ASSETS_URL, htmlHeader)
		.then((response) =>
			response.text()
		).then((body) =>  {
			if (body != '') {
				return body;
			}
			else {
				return Promise.reject(body);
			}
		}).catch((err) => err);
}

export function loadTemplate() {
	return fetch(ELEMENTS_URL, jsonHeader)
		.then((response) => 
			response.json().then((templates) => ({ templates, response }))
		).then(({ templates, response }) =>  {
			
			if (!response.ok) {
				return Promise.reject(templates);
			} else {
				return templates.elements;
			}
		}).catch((err) => err);
}

export function loadPages() {
	return fetch(ALL_PAGES_URL, jsonHeader)
		.then((response) => 
			response.json().then((pages) => ({ pages, response }))
		).then(({ pages, response }) =>  {
			if (!response.ok) {
				return Promise.reject(pages);
			} else {
				return pages;
			}
		}).catch((err) => err);
}

export function loadHtml(url) {
	return fetch(url, htmlHeader)
		.then((response) =>
			response.text()
		).then((body) =>  {
			if (body != '') {
				let htmlDom = document.createElement('html');
				htmlDom.innerHTML = body;
				let page = htmlDom.getElementsByTagName('body')[0];
				let scripts = page.getElementsByTagName('script');
				for(let script of scripts) {
					script.remove();
				}
				return page.innerHTML;
			}
			else {
				return Promise.reject(body);
			}
		}).catch((err) => err);
}

export function loadImages(path) {
	return fetch(IMAGES_URL + path , jsonHeader)
		.then((response) =>
			response.json().then((images) => ({ images, response }))
		).then(({ images, response }) =>  {
			if (!response.ok) {
				return Promise.reject(images);
			} else {
				return images;
			}
		}).catch((err) => err);
}

export function uploadImage(file) {
	let fd = new FormData();    
	fd.append('imgFileField', file);
	let header = postHeader;
	header.body = fd;

	return fetch(IMAGE_UPLOAD_URL, header)
		.then((response) =>
			response.json().then((result) => ({ result, response }))
		).then(({ result, response }) =>  {
			if (!response.ok) {
				return Promise.reject(result);
			} else {
				return result.response;
			}
		}).catch((err) => err);
}

export function removeUploadedImage(file) {
	let fd = new FormData();    
	fd.append('uploaded', file);
	let header = postHeader;
	header.body = fd;

	return fetch(IMAGE_REMOVE_URL, header)
		.then((response) =>
			response.json().then((result) => ({ result, response }))
		).then(({ result, response }) =>  {
			if (!response.ok) {
				return Promise.reject(result);
			} else if (result.response.code == 0) {
				return Promise.reject(result);
			} else {
				return result.response;
			}
		}).catch((err) => err);
}

export function loadFile(pagename) {
	return fetch(PAGE_SECTION_URL + pagename, jsonHeader)
		.then((response) =>
			response.json().then((page) => ({ page, response }))
		).then(({ page, response }) =>  {
			if (!response.ok) {
				return Promise.reject(page);
			} else {
				return page;
			}
		}).catch((err) => err);
}

export function saveFile(pageid, content) {
	let fd = new FormData();
	fd.append('pageid', pageid);
	fd.append('content', content);
	let header = postHeader;
	header.body = fd;
	return fetch(SAVE_PAGE_URL, header)
		.then((response) =>
			response.json().then((result) => ({ result, response }))
		).then(({ result, response }) =>  {
			if (!response.ok) {
				return Promise.reject(result);
			} else if (result.code == 0) {
				return Promise.reject(result);
			} else {
				return result.response;
			}
		}).catch((err) => err);
}

export function loadExternals() {
	return fetch(GET_EXTERNAL_URL, jsonHeader)
		.then((response) => 
			response.json().then((externals) => ({ externals, response }))
		).then(({ externals, response }) =>  {
			if (!response.ok) {
				return Promise.reject(externals);
			} else {
				return externals;
			}
		}).catch((err) => err);
}

export function loadGlobals() {
	return fetch(GET_GLOBAL_SETTING_URL, jsonHeader)
		.then((response) => 
			response.json().then((globals) => ({ globals, response }))
		).then(({ globals, response }) =>  {
			if (!response.ok) {
				return Promise.reject(globals);
			} else {
				return globals;
			}
		}).catch((err) => err);
}

export async function loadAsyncHtml(url) {
	const data = await fetch(url, htmlHeader);
	const html = await data.text();

	if (html != '') {
		let htmlDom = document.createElement('html');
		htmlDom.innerHTML = html;
		let page = htmlDom.getElementsByTagName('body')[0];
		let scripts = page.getElementsByTagName('script');

		for(let script of scripts) {
			script.remove();
		}
		return page.innerHTML;
	}
	return false;
}
