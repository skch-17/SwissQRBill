"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../shared/utils.js");
const qr_code_generator_js_1 = require("./qr-code-generator.js");
/**
 * Limits the maximum and minimum number possible according to the PDF specifications.
 * Borrowed from: https://github.com/foliojs/pdfkit/blob/120c3f9519e49d719a88d22d70139cc9f54d17d8/lib/object.js#L123-L130
 */
function limitNumber(n) {
    if (n > -1e21 && n < 1e21) {
        return Math.round(n * 1e6) / 1e6;
    }
    throw new Error(`unsupported number: ${n}`);
}
function generateQRCode(data, type, size) {
    var _a;
    let qrString = "";
    //-- Swiss Payments Code
    qrString += "SPC";
    //-- Version
    qrString += "\n0200";
    //-- Coding Type UTF-8
    qrString += "\n1";
    //-- IBAN
    qrString += (_a = "\n" + data.creditor.account) !== null && _a !== void 0 ? _a : "\n";
    //-- Creditor
    if (data.creditor.buildingNumber !== undefined) {
        // Address Type
        qrString += "\nS";
        // Name
        qrString += "\n" + data.creditor.name;
        // Address
        qrString += "\n" + data.creditor.address;
        // House number
        qrString += "\n" + data.creditor.buildingNumber;
        // Zip
        qrString += "\n" + data.creditor.zip;
        // City
        qrString += "\n" + data.creditor.city;
    }
    else {
        // Address Type
        qrString += "\nK";
        // Name
        qrString += "\n" + data.creditor.name;
        // Address
        qrString += "\n" + data.creditor.address;
        // Zip + city
        if ((data.creditor.zip + " " + data.creditor.city).length > 70) {
            throw new Error("Creditor zip plus city must be a maximum of 70 characters.");
        }
        qrString += "\n" + data.creditor.zip + " " + data.creditor.city;
        // Empty zip field
        qrString += "\n";
        // Empty city field
        qrString += "\n";
    }
    qrString += "\n" + data.creditor.country;
    //-- 7 x empty
    qrString += "\n"; // 1
    qrString += "\n"; // 2
    qrString += "\n"; // 3
    qrString += "\n"; // 4
    qrString += "\n"; // 5
    qrString += "\n"; // 6
    qrString += "\n"; // 7
    //-- Amount
    if (data.amount !== undefined) {
        qrString += "\n" + data.amount.toFixed(2);
    }
    else {
        qrString += "\n";
    }
    //-- Currency
    qrString += "\n" + data.currency;
    //-- Debtor
    if (data.debtor !== undefined) {
        if (data.debtor.buildingNumber !== undefined) {
            // Address type
            qrString += "\nS";
            // Name
            qrString += "\n" + data.debtor.name;
            // Address
            qrString += "\n" + data.debtor.address;
            // House number
            qrString += "\n" + data.debtor.buildingNumber;
            // Zip
            qrString += "\n" + data.debtor.zip;
            // City
            qrString += "\n" + data.debtor.city;
        }
        else {
            // Address type
            qrString += "\nK";
            // Name
            qrString += "\n" + data.debtor.name;
            // Address
            qrString += "\n" + data.debtor.address;
            // Zip + city
            if ((data.debtor.zip + " " + data.debtor.city).length > 70) {
                throw new Error("Debtor zip plus city must be a maximum of 70 characters.");
            }
            qrString += "\n" + data.debtor.zip + " " + data.debtor.city;
            // Empty field zip
            qrString += "\n";
            // Empty field city
            qrString += "\n";
        }
        // Country
        qrString += "\n" + data.debtor.country;
    }
    else {
        // Empty field type
        qrString += "\n";
        // Empty field name
        qrString += "\n";
        // Empty field address
        qrString += "\n";
        // Empty field house number
        qrString += "\n";
        // Empty field zip
        qrString += "\n";
        // Empty field city
        qrString += "\n";
        // Empty field country
        qrString += "\n";
    }
    //-- Reference type
    qrString += "\n" + (0, utils_js_1.getReferenceType)(data.reference);
    //-- Reference
    if (data.reference !== undefined) {
        qrString += "\n" + data.reference;
    }
    else {
        qrString += "\n";
    }
    //-- Unstructured message
    if (data.message !== undefined) {
        qrString += "\n" + data.message;
    }
    else {
        qrString += "\n";
    }
    //-- End Payment Data
    qrString += "\n" + "EPD";
    //-- Additional information
    if (data.additionalInformation !== undefined) {
        qrString += "\n" + data.additionalInformation;
    }
    else {
        qrString += "\n";
    }
    //-- AV1
    if (data.av1 !== undefined) {
        qrString += "\n" + data.av1;
    }
    if (data.av2 !== undefined) {
        qrString += "\n" + data.av2;
    }
    //-- Create QR Code
    const eci = qr_code_generator_js_1.qrcodegen.QrSegment.makeEci(26);
    const segments = qr_code_generator_js_1.qrcodegen.QrSegment.makeSegments(qrString);
    const qrCode = qr_code_generator_js_1.qrcodegen.QrCode.encodeSegments([eci, ...segments], qr_code_generator_js_1.qrcodegen.QrCode.Ecc.MEDIUM, 10, 25);
    const blockSize = size / qrCode.size;
    const parts = [];
    for (let x = 0; x < qrCode.size; x++) {
        const xPos = x * blockSize;
        for (let y = 0; y < qrCode.size; y++) {
            const yPos = y * blockSize;
            if (qrCode.getModule(x, y)) {
                switch (type) {
                    case "pdf":
                        parts.push(`${limitNumber(xPos)} ${limitNumber(yPos)} ${limitNumber(blockSize)} ${limitNumber(blockSize)} re`);
                        break;
                    case "svg":
                        parts.push(`M ${xPos}, ${yPos} V ${yPos + blockSize} H ${xPos + blockSize} V ${yPos} H ${xPos} Z `);
                        break;
                }
            }
        }
    }
    return parts.join(" ");
}
exports.default = generateQRCode;
//# sourceMappingURL=qr-code.js.map