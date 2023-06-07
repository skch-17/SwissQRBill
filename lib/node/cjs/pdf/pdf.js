"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PDF = exports.QRBill = void 0;
const extended_pdf_js_1 = require("./extended-pdf.js");
const shared_js_1 = require("../shared/shared.js");
const utils = __importStar(require("../shared/utils.js"));
const translations_js_1 = __importDefault(require("../shared/translations.js"));
const qr_code_js_1 = __importDefault(require("../shared/qr-code.js"));
class QRBill {
    constructor(data, options) {
        this._size = "A6/5";
        this._scissors = true;
        this._separate = false;
        this._outlines = true;
        this._language = "DE";
        this._marginTop = 0;
        this._fontName = "Helvetica";
        this._fontNameBold = "Helvetica-Bold";
        this._data = data;
        //-- Clean data (remove line breaks and unnecessary whitespaces)
        this._data = (0, shared_js_1.cleanData)(this._data);
        //-- Validate data
        (0, shared_js_1.validateData)(this._data);
        //-- Generate QR Code
        this._qrcode = (0, qr_code_js_1.default)(this._data, "pdf", utils.mm2pt(46));
        //-- Apply options
        if (options !== undefined) {
            if (options.size !== undefined) {
                this._size = options.size;
            }
            if (options.language !== undefined) {
                this._language = options.language;
            }
            if (options.scissors !== undefined) {
                this._scissors = options.scissors;
                this._separate = !options.scissors;
            }
            if (options.separate !== undefined) {
                this._separate = options.separate;
                this._scissors = !options.separate;
            }
            if (options.scissors === false && options.separate === false) {
                this._separate = false;
                this._scissors = false;
            }
            if (options.outlines !== undefined) {
                this._outlines = options.outlines;
            }
            if (options.fontName !== undefined) {
                this._fontName = options.fontName;
                this._fontName = options.fontName + "-Bold";
            }
        }
    }
    /**
     * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
     *
     * @param doc - The PDFKit instance
     * @param size - The size of the new page if not enough space is left for the QR slip.
     */
    attachTo(doc, size) {
        if (size == undefined) {
            size = this._size;
        }
        if (!doc.page || (doc.page.height - doc.y < utils.mm2pt(105) && doc.y !== doc.page.margins.top)) {
            doc.addPage({
                margin: 0,
                layout: size === "A4" ? "portrait" : "landscape",
                size: size === "A4" ? size : [utils.mm2pt(105), utils.mm2pt(210)]
            });
        }
        this._marginTop = doc.page.height - utils.mm2pt(105);
        this._render(doc);
    }
    _render(doc) {
        //-- Lines
        if (this._outlines) {
            //-- Horizontal line
            if (doc.page.height > utils.mm2pt(105)) {
                doc.moveTo(0, this._marginTop)
                    .lineTo(utils.mm2pt(210), this._marginTop)
                    .lineWidth(.75)
                    .strokeOpacity(1)
                    .dash(1, { size: 1 })
                    .strokeColor("black")
                    .stroke();
            }
            //-- Vertical line
            doc.moveTo(utils.mm2pt(62), this._marginTop)
                .lineTo(utils.mm2pt(62), this._marginTop + utils.mm2pt(105))
                .lineWidth(.75)
                .strokeOpacity(1)
                .dash(1, { size: 1 })
                .strokeColor("black")
                .stroke();
        }
        //-- Scissors
        if (this._scissors) {
            const scissorsTop = "4.545 -1.803 m4.06 -2.388 3.185 -2.368 2.531 -2.116 c-1.575 -0.577 l-2.769 -1.23 -3.949 -1.043 -3.949 -1.361 c-3.949 -1.61 -3.721 -1.555 -3.755 -2.203 c-3.788 -2.825 -4.437 -3.285 -5.05 -3.244 c-5.664 -3.248 -6.3 -2.777 -6.305 -2.129 c-6.351 -1.476 -5.801 -0.869 -5.152 -0.826 c-4.391 -0.713 -3.043 -1.174 -2.411 -0.041 c-2.882 0.828 -3.718 0.831 -4.474 0.787 c-5.101 0.751 -5.855 0.931 -6.154 1.547 c-6.443 2.138 -6.16 2.979 -5.496 3.16 c-4.826 3.406 -3.906 3.095 -3.746 2.325 c-3.623 1.731 -4.044 1.452 -3.882 1.236 c-3.76 1.073 -2.987 1.168 -1.608 0.549 c2.838 2.117 l3.4 2.273 4.087 2.268 4.584 1.716 c-0.026 -0.027 l4.545 -1.803 lh-4.609 -2.753 m-3.962 -2.392 -4.015 -1.411 -4.687 -1.221 c-5.295 -1.009 -6.073 -1.6 -5.879 -2.26 c-5.765 -2.801 -5.052 -3 -4.609 -2.753 ch-4.581 1.256 m-3.906 1.505 -4.02 2.648 -4.707 2.802 c-5.163 2.96 -5.814 2.733 -5.86 2.196 c-5.949 1.543 -5.182 0.954 -4.581 1.256 ch";
            const scissorsCenter = "1.803 4.545 m2.388 4.06 2.368 3.185 2.116 2.531 c0.577 -1.575 l1.23 -2.769 1.043 -3.949 1.361 -3.949 c1.61 -3.949 1.555 -3.721 2.203 -3.755 c2.825 -3.788 3.285 -4.437 3.244 -5.05 c3.248 -5.664 2.777 -6.3 2.129 -6.305 c1.476 -6.351 0.869 -5.801 0.826 -5.152 c0.713 -4.391 1.174 -3.043 0.041 -2.411 c-0.828 -2.882 -0.831 -3.718 -0.787 -4.474 c-0.751 -5.101 -0.931 -5.855 -1.547 -6.154 c-2.138 -6.443 -2.979 -6.16 -3.16 -5.496 c-3.406 -4.826 -3.095 -3.906 -2.325 -3.746 c-1.731 -3.623 -1.452 -4.044 -1.236 -3.882 c-1.073 -3.76 -1.168 -2.987 -0.549 -1.608 c-2.117 2.838 l-2.273 3.4 -2.268 4.087 -1.716 4.584 c0.027 -0.026 l1.803 4.545 lh2.753 -4.609 m2.392 -3.962 1.411 -4.015 1.221 -4.687 c1.009 -5.295 1.6 -6.073 2.26 -5.879 c2.801 -5.765 3 -5.052 2.753 -4.609 ch-1.256 -4.581 m-1.505 -3.906 -2.648 -4.02 -2.802 -4.707 c-2.96 -5.163 -2.733 -5.814 -2.196 -5.86 c-1.543 -5.949 -0.954 -5.182 -1.256 -4.581 ch";
            if (doc.page.height > utils.mm2pt(105)) {
                doc.save().translate(utils.mm2pt(105), this._marginTop);
                doc.addContent(scissorsTop)
                    .fillColor("black")
                    .fill();
                doc.restore();
            }
            doc.save().translate(utils.mm2pt(62), this._marginTop + 30);
            doc.addContent(scissorsCenter)
                .fillColor("black")
                .fill();
            doc.restore();
        }
        //-- Separation text
        if (this._separate) {
            if (doc.page.height > utils.mm2pt(105)) {
                doc.fontSize(11);
                doc.font(this._fontName);
                doc.text(translations_js_1.default[this._language].separate, utils.mm2pt(0), this._marginTop - 12, {
                    width: utils.mm2pt(210),
                    align: "center"
                });
            }
        }
        //-- Receipt
        doc.fontSize(11);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].receipt, utils.mm2pt(5), this._marginTop + utils.mm2pt(5), {
            width: utils.mm2pt(52),
            align: "left"
        });
        doc.fontSize(6);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].account, utils.mm2pt(5), this._marginTop + utils.mm2pt(12) + 3, {
            width: utils.mm2pt(52),
            lineGap: 1
        });
        //-- Creditor
        doc.fontSize(8);
        doc.font(this._fontName);
        doc.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
            width: utils.mm2pt(52),
            lineGap: -.5
        });
        doc.moveDown();
        //-- Reference
        if (this._data.reference !== undefined) {
            doc.fontSize(6);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].reference, {
                width: utils.mm2pt(52),
                lineGap: 1
            });
            doc.fontSize(8);
            doc.font(this._fontName);
            doc.text(utils.formatReference(this._data.reference), {
                width: utils.mm2pt(52),
                lineGap: -.5
            });
        }
        //-- Debtor
        if (this._data.debtor !== undefined) {
            doc.fontSize(9);
            doc.moveDown();
            doc.fontSize(6);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].payableBy, {
                width: utils.mm2pt(52),
                lineGap: 1
            });
            doc.fontSize(8);
            doc.font(this._fontName);
            doc.text(this._formatAddress(this._data.debtor), {
                width: utils.mm2pt(52),
                lineGap: -.5
            });
        }
        else {
            doc.fontSize(9);
            doc.moveDown();
            doc.fontSize(6);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].payableByName, {
                width: utils.mm2pt(52),
                lineGap: 1
            });
            //-- Add rectangle
            this._addRectangle(doc, 5, utils.pt2mm(doc.y - this._marginTop), 52, 20);
        }
        //-- Amount
        doc.fontSize(6);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(68), {
            width: utils.mm2pt(15),
            lineGap: 1
        });
        const amountXPosition = this._data.amount === undefined ? 18 : 27;
        doc.text(translations_js_1.default[this._language].amount, utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(68), {
            width: utils.mm2pt(52 - amountXPosition),
            lineGap: 1
        });
        doc.fontSize(8);
        doc.font(this._fontName);
        doc.text(this._data.currency, utils.mm2pt(5), this._marginTop + utils.mm2pt(71), {
            width: utils.mm2pt(15),
            lineGap: -.5
        });
        if (this._data.amount !== undefined) {
            doc.text(utils.formatAmount(this._data.amount), utils.mm2pt(amountXPosition), this._marginTop + utils.mm2pt(71), {
                width: utils.mm2pt(52 - amountXPosition),
                lineGap: -.5
            });
        }
        else {
            this._addRectangle(doc, 27, 68, 30, 10);
        }
        doc.fontSize(6);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].acceptancePoint, utils.mm2pt(5), this._marginTop + utils.mm2pt(82), {
            width: utils.mm2pt(52),
            align: "right",
            lineGap: 1
        });
        //-- Payment part middle container
        doc.fontSize(11);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].paymentPart, utils.mm2pt(67), this._marginTop + utils.mm2pt(5), {
            width: utils.mm2pt(51),
            align: "left",
            lineGap: 1
        });
        //-- QR Code
        this._renderQRCode(doc);
        doc.fillColor("black");
        //-- Amount
        doc.fontSize(8);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(68), {
            width: utils.mm2pt(15),
            lineGap: 1
        });
        doc.text(translations_js_1.default[this._language].amount, utils.mm2pt(89), this._marginTop + utils.mm2pt(68), {
            width: utils.mm2pt(29)
        });
        doc.fontSize(10);
        doc.font(this._fontName);
        doc.text(this._data.currency, utils.mm2pt(67), this._marginTop + utils.mm2pt(72), {
            width: utils.mm2pt(15),
            lineGap: -.5
        });
        if (this._data.amount !== undefined) {
            doc.text(utils.formatAmount(this._data.amount), utils.mm2pt(89), this._marginTop + utils.mm2pt(72), {
                width: utils.mm2pt(29),
                lineGap: -.5
            });
        }
        else {
            this._addRectangle(doc, 78, 72, 40, 15);
        }
        //-- AV1 and AV2
        if (this._data.av1 !== undefined) {
            const [scheme, data] = this._data.av1.split(/(\/.+)/);
            doc.fontSize(7);
            doc.font(this._fontNameBold);
            doc.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(90), {
                width: utils.mm2pt(138),
                continued: true,
                lineGap: 1
            });
            doc.font(this._fontName);
            doc.text(this._data.av1.length > 90 ? data.substr(0, 87) + "..." : data, {
                continued: false
            });
        }
        if (this._data.av2 !== undefined) {
            const [scheme, data] = this._data.av2.split(/(\/.+)/);
            doc.fontSize(7);
            doc.font(this._fontNameBold);
            doc.text(scheme, utils.mm2pt(67), this._marginTop + utils.mm2pt(93), {
                width: utils.mm2pt(138),
                continued: true,
                lineGap: 1
            });
            doc.font(this._fontName);
            doc.text(this._data.av2.length > 90 ? data.substr(0, 87) + "..." : data, {
                lineGap: -.5
            });
        }
        //-- Payment part right column
        doc.fontSize(8);
        doc.font(this._fontNameBold);
        doc.text(translations_js_1.default[this._language].account, utils.mm2pt(118), this._marginTop + utils.mm2pt(5) + 3, {
            width: utils.mm2pt(87),
            lineGap: 1
        });
        doc.fontSize(10);
        doc.font(this._fontName);
        doc.text(`${utils.formatIBAN(this._data.creditor.account)}\n${this._formatAddress(this._data.creditor)}`, {
            width: utils.mm2pt(87),
            lineGap: -.75
        });
        doc.moveDown();
        if (this._data.reference !== undefined) {
            doc.fontSize(8);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].reference, {
                width: utils.mm2pt(87),
                lineGap: 1
            });
            doc.fontSize(10);
            doc.font(this._fontName);
            doc.text(utils.formatReference(this._data.reference), {
                width: utils.mm2pt(87),
                lineGap: -.75
            });
            doc.moveDown();
        }
        //-- Message / Additional information
        if (this._data.message !== undefined || this._data.additionalInformation !== undefined) {
            doc.fontSize(8);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].additionalInformation, {
                width: utils.mm2pt(87),
                lineGap: 1
            });
            doc.fontSize(10);
            doc.font(this._fontName);
            const options = {
                width: utils.mm2pt(87),
                lineGap: -.75
            };
            const singleLineHeight = doc.heightOfString("A", options);
            const referenceType = utils.getReferenceType(this._data.reference);
            const maxLines = referenceType === "QRR" || referenceType === "SCOR" ? 3 : 4;
            const linesOfAdditionalInformation = this._data.additionalInformation !== undefined ? doc.heightOfString(this._data.additionalInformation, options) / singleLineHeight : 0;
            if (this._data.additionalInformation !== undefined) {
                if (referenceType === "QRR" || referenceType === "SCOR") {
                    // QRR and SCOR have 1 line for the message and 2 lines for the additional information
                    if (this._data.message !== undefined) {
                        doc.text(this._data.message, Object.assign(Object.assign({}, options), { lineBreak: false, ellipsis: true, height: singleLineHeight }));
                    }
                }
                else {
                    // Non QRR and SCOR have 4 lines total available and the message should be shortened if necessary
                    if (this._data.message !== undefined) {
                        const maxLinesOfMessage = maxLines - linesOfAdditionalInformation;
                        doc.text(this._data.message, Object.assign(Object.assign({}, options), { height: singleLineHeight * maxLinesOfMessage, lineBreak: true, ellipsis: true }));
                    }
                }
                doc.text(this._data.additionalInformation, options);
            }
            else if (this._data.message !== undefined) {
                doc.text(this._data.message, Object.assign(Object.assign({}, options), { height: singleLineHeight * maxLines, lineBreak: true, ellipsis: true }));
            }
            doc.moveDown();
        }
        if (this._data.debtor !== undefined) {
            doc.fontSize(8);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].payableBy, {
                width: utils.mm2pt(87),
                lineGap: 1
            });
            doc.fontSize(10);
            doc.font(this._fontName);
            doc.text(this._formatAddress(this._data.debtor), {
                width: utils.mm2pt(87),
                lineGap: -.75
            });
        }
        else {
            doc.fontSize(8);
            doc.font(this._fontNameBold);
            doc.text(translations_js_1.default[this._language].payableByName, {
                width: utils.mm2pt(87),
                lineGap: 1
            });
            this._addRectangle(doc, 118, utils.pt2mm(doc.y - this._marginTop), 65, 25);
        }
    }
    _renderQRCode(doc) {
        //-- Add QR Code
        doc.save().translate(utils.mm2pt(67), this._marginTop + utils.mm2pt(17));
        doc.addContent(this._qrcode).fillColor("black").fill();
        doc.restore();
        //-- Add Swiss Cross
        const swissCrossBackground = "18.3 0.7 m1.6 0.7 l0.7 0.7 l0.7 1.6 l0.7 18.3 l0.7 19.1 l1.6 19.1 l18.3 19.1 l19.1 19.1 l19.1 18.3 l19.1 1.6 l19.1 0.7 lh";
        const swissCross = "8.3 4 m11.6 4 l11.6 15 l8.3 15 l8.3 4 lh4.4 7.9 m15.4 7.9 l15.4 11.2 l4.4 11.2 l4.4 7.9 lh";
        doc.save().translate(utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36));
        doc.addContent(swissCrossBackground)
            .undash()
            .fillColor("black")
            .lineWidth(1.42)
            .strokeColor("white")
            .fillAndStroke();
        doc.restore();
        doc.save().translate(utils.mm2pt(86.5), this._marginTop + utils.mm2pt(36));
        doc.addContent(swissCross)
            .fillColor("white")
            .fill();
        doc.restore();
    }
    _formatAddress(data) {
        const countryPrefix = data.country !== "CH" ? data.country + " - " : "";
        if (data.buildingNumber !== undefined) {
            return `${data.name}\n${data.address} ${data.buildingNumber}\n${countryPrefix}${data.zip} ${data.city}`;
        }
        return `${data.name}\n${data.address}\n${countryPrefix}${data.zip} ${data.city}`;
    }
    _addRectangle(doc, x, y, width, height) {
        const length = 3;
        doc.moveTo(utils.mm2pt(x + length), this._marginTop + utils.mm2pt(y))
            .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y))
            .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + length))
            .moveTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + height - length))
            .lineTo(utils.mm2pt(x), this._marginTop + utils.mm2pt(y + height))
            .lineTo(utils.mm2pt(x + length), this._marginTop + utils.mm2pt(y + height))
            .moveTo(utils.mm2pt(x + width - length), this._marginTop + utils.mm2pt(y + height))
            .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + height))
            .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + height - length))
            .moveTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y + length))
            .lineTo(utils.mm2pt(x + width), this._marginTop + utils.mm2pt(y))
            .lineTo(utils.mm2pt(x + width - length), this._marginTop + utils.mm2pt(y))
            .lineWidth(.75)
            .undash()
            .strokeColor("black")
            .stroke();
    }
}
exports.QRBill = QRBill;
class PDF extends extended_pdf_js_1.ExtendedPDF {
    constructor(size = "A6/5", options) {
        options = Object.assign({}, {
            margin: utils.mm2pt(5),
            layout: size === "A4" ? "portrait" : "landscape",
            size: size === "A4" ? size : [utils.mm2pt(105), utils.mm2pt(210)],
            autoFirstPage: false
        }, options);
        super(options);
        this.size = "A6/5";
        this.size = size;
        this.info.Producer = this.info.Creator = this.info.Author = "SwissQRBill";
    }
    /**
     * Adds a new page to the PDF. This method is basically the same as the original [PDFKit `addPage()` method](https://pdfkit.org/docs/getting_started.html#adding_pages). However the default values are changed to use the default page size provided in the constructor options.
     * @param options - An object containing [PDFKit document options.](https://pdfkit.org/docs/getting_started.html#adding_pages)
     * @returns `this`
     */
    addPage(options) {
        options = Object.assign({}, {
            margin: utils.mm2pt(5),
            layout: this.size === "A4" ? "portrait" : "landscape",
            size: this.size === "A4" ? this.size : [utils.mm2pt(105), utils.mm2pt(210)]
        }, options);
        return super.addPage(options);
    }
    end() {
        this.emit("beforeEnd", this);
        return super.end();
    }
    /**
     * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
     *
     * @param bill - The {@link QRBill} that will be attached
     * @param size - The {@link Size} of the new page if not enough space is left for the QR slip.
     *
     */
    addQRBill(bill, size) {
        bill.attachTo(this, size);
    }
}
exports.PDF = PDF;
//# sourceMappingURL=pdf.js.map