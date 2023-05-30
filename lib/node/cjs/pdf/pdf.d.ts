/// <reference types="pdfkit" />
import { ExtendedPDF } from "./extended-pdf.js";
import { Size, Data, Options } from "../shared/types";
export declare class QRBill {
    private readonly _data;
    private readonly _qrcode;
    private _size;
    private _scissors;
    private _separate;
    private _outlines;
    private _language;
    private _marginTop;
    constructor(data: Data, options?: Options);
    /**
     * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the specified size and add it to the bottom of this page.
     *
     * @param doc - The PDFKit instance
     * @param size - The size of the new page if not enough space is left for the QR slip.
     */
    attachTo(doc: PDFKit.PDFDocument, size?: Size): void;
    private _render;
    private _renderQRCode;
    private _formatAddress;
    private _addRectangle;
}
export declare class PDF extends ExtendedPDF {
    size: Size;
    constructor(size?: Size, options?: PDFKit.PDFDocumentOptions);
    /**
     * Adds a new page to the PDF. This method is basically the same as the original [PDFKit `addPage()` method](https://pdfkit.org/docs/getting_started.html#adding_pages). However the default values are changed to use the default page size provided in the constructor options.
     * @param options - An object containing [PDFKit document options.](https://pdfkit.org/docs/getting_started.html#adding_pages)
     * @returns `this`
     */
    addPage(options?: PDFKit.PDFDocumentOptions): PDFKit.PDFDocument;
    end(): void;
    /**
     * Adds the QR Slip to the bottom of the current page if there is enough space, otherwise it will create a new page with the size specified in the options of the QRBill (default A6/5) and add it to the bottom of this page.
     *
     * @param bill - The {@link QRBill} that will be attached
     *
     */
    addQRBill(bill: QRBill): void;
}
