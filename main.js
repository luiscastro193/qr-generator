"use strict";
import {qrcodegen, toSvgString} from './qr.js';

const input = document.querySelector('textarea');
const qrElement = document.querySelector('article');

function qr(content) {
	return toSvgString(qrcodegen.QrCode.encodeText(content, qrcodegen.QrCode.Ecc.LOW));
}

input.oninput = () => {
	let content = input.value.trim();
	qrElement.innerHTML = content ? qr(content) : '';
}

window.onhashchange = () => location.reload();

if (location.hash) {
	const unzip = await import("https://luiscastro193.github.io/zip-string/zip-string.js").then(module => module.unzip);
	input.value = await unzip(location.hash.slice(1));
	history.pushState(null, '', ' ');
}

input.oninput();
