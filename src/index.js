


pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/build/pdf.worker.js';

// let DEFAULT_URL = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
let DEFAULT_URL = 'https://www.finra.org/sites/default/files/web-crd-view-individual.pdf';

let container = document.getElementById('pageContainer');

let loadingTask = pdfjsLib.getDocument({
    url: DEFAULT_URL,
    cMapUrl: './pdfjs-dist/cmaps/',
    cMapPacked: true,
});

loadingTask.promise.then(function(pdfDoc) {
    
    for(let i=0; i<pdfDoc.numPages; i++){
        
        pdfDoc.getPage(i+1).then(function(pdfPage) {

            let viewport = pdfPage.getViewport({scale: 1});
            let scale = 800 / viewport.width; 
           
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