"use strict";
import {qrcodegen, toSvgString} from './qr.js';

const input = document.querySelector('textarea');
const qrElement = document.querySelector('article');

function qr(content, errorCorrection) {
	let ecc = errorCorrection ? qrcodegen.QrCode.Ecc.MEDIUM : qrcodegen.QrCode.Ecc.LOW;
	return toSvgString(qrcodegen.QrCode.encodeText(content, ecc));
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

function download(blob, filename) {
	let link = document.createElement("a");
	let url = URL.createObjectURL(blob);
	link.href = url;
	link.download = filename;
	document.body.append(link);
	link.click();
	URL.revokeObjectURL(url);
	link.remove();
}

document.querySelector('#download').onclick = () => {
	let content = input.value.trim();
	if (input.reportValidity() && content)
		download(new Blob([qr(content, true)]), "QR.svg");
};

document.querySelector('#share').onclick = () => {
	let url = location.href;
	let content = input.value.trim();
	if (content) url = new URL('#' + encodeURIComponent(content), url);
	
	if (navigator.share)
		navigator.share({url});
	else
		navigator.clipboard.writeText(url).then(() => alert("Link copied to clipboard"));
};
