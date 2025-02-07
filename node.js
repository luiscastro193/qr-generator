"use strict";
import {qrcodegen, toSvgString} from './qr.js';
import {writeFile} from 'fs/promises';

function qr(content) {
	return toSvgString(qrcodegen.QrCode.encodeText(content, qrcodegen.QrCode.Ecc.MEDIUM));
}

if (process.argv.length < 3)
	throw "Pass the QR content as an argument";

writeFile("QR.svg", qr(process.argv[2]));
