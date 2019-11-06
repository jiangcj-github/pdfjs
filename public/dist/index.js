
window.location.parse = function () {
	let obj = {};
	this.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => obj[k] = v);
	return obj;
}

let token = location.parse()["token"];

// renderPDF("./2.pdf");


axios.get(`/edispatch/invoice/url/byToken?token=${token}`).then(function (response) {
    let {invoiceUrl, proxyUrl} = response.data || {};

    let downloadBtn = document.querySelector(".downloadBtn");
    downloadBtn.href = "invoiceUrl";

    renderPDF(proxyUrl);

}).catch(function (error) {
    console.log(error);
    alert(error);
});

function renderPDF(url) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/build/pdf.worker.js';

    let container = document.getElementById('pageContainer');
    
    let CSS_UNITS = 96 / 72;
    
    // let width = document.body.clientWidth * 0.8;
    let width = 400;
    
    let loadingTask = pdfjsLib.getDocument({
        url: url,
        cMapUrl: './pdfjs-dist/cmaps/',
        cMapPacked: true,
    });
    
    loadingTask.promise.then(function(pdfDoc) {
        for(let i=0; i<pdfDoc.numPages; i++){
            pdfDoc.getPage(i+1).then(function(pdfPage) {
    
                let viewport = pdfPage.getViewport({scale: 1});
                let scale = width / viewport.width / CSS_UNITS; 
    
                let pdfPageView = new pdfjsViewer.PDFPageView({
                    container: container,
                    scale: scale,
                    defaultViewport: viewport,
                    textLayerFactory: new pdfjsViewer.DefaultTextLayerFactory(),
                    annotationLayerFactory: new pdfjsViewer.DefaultAnnotationLayerFactory(),
                });
    
                pdfPageView.setPdfPage(pdfPage);
                pdfPageView.draw();
            });
        }
    });
}

