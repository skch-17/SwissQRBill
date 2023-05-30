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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = exports.utils = void 0;
const pdf_js_1 = require("../pdf/pdf.js");
const svg_js_1 = require("./svg.js");
const utils = __importStar(require("../shared/utils.js"));
exports.utils = __importStar(require("../shared/utils.js"));
const types = __importStar(require("../shared/types.js"));
exports.types = __importStar(require("../shared/types.js"));
__exportStar(require("./svg.js"), exports);
__exportStar(require("../pdf/pdf.js"), exports);
const SwissQRBill = {
    utils: utils,
    types: types,
    PDF: pdf_js_1.PDF,
    SVG: svg_js_1.SVG,
    QRBill: pdf_js_1.QRBill
};
exports.default = SwissQRBill;
//# sourceMappingURL=index.js.map