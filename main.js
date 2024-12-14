"use strict";
import {qrcodegen, toSvgString} from './qr.js';

const input = document.querySelector('textarea');
const qrElement = document.querySelector('article');

function qr(content) {
	return toSvgString(qrcodegen.QrCode.encodeText(content, qrcodegen.QrCode.Ecc.LOW));
}

input.oninput = () => {
	qrElement.innerHTML = '';
	let content = input.value.trim();
	if (content) qrElement.innerHTML = qr(content);
}

window.onhashchange = () => location.reload();

if (location.hash) {
	input.value = decodeURIComponent(location.hash.slice(1));
	history.pushState(null, '', ' ');
}

input.oninput();
