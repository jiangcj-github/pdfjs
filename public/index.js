
window.location.parse = function () {
	let obj = {};
	this.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => obj[k] = v);
	return obj;
}

let token = location.parse()["token"];

// renderPDF("./2.pdf");

function download_file(fileURL, fileName) {
    if (!window.ActiveXObject) {
        var save = document.createElement('a');
        save.href = fileURL;
        save.target = '_blank';
        var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
        save.download = fileName || filename;
        if (navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0) {
            document.location = save.href; 
        }else{
            var evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }	
    }else if ( !! window.ActiveXObject && document.execCommand)     {
        var _window = window.open(fileURL, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileName || fileURL)
        _window.close();
    }
}

// download_file("./2.pdf");

axios.get(`/edispatch/invoice/url/byToken?token=${token}`).then(function (response) {
    let res = response.data;
    if(!res || res.code != 100200){
        alert(res.message);
        return;
    }
    let {invoiceUrl, proxyUrl} = res.data || {};

    let downloadBtn = document.querySelector(".downloadBtn");
    downloadBtn.onclick = download_file(proxyUrl);

    renderPDF(proxyUrl);

}).catch(function (error) {
    console.log(error);
});

function renderPDF(url) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './pdfjs-dist/build/pdf.worker.min.js';

    let container = document.getElementById('pageContainer');
    
    let CSS_UNITS = 96 / 72;
    
    let width = document.body.clientWidth - 40;
    width > 1192 && (width = 1192);
    
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

