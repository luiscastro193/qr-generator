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

input.oninput();
