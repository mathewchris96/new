document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resizeBtn').addEventListener('click', function() {
        redirectToManipulationPage('resize_image.html');
    });

    document.getElementById('convertToPngBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_png.html');
    });

    document.getElementById('convertToJpgBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_jpg.html');
    });

    document.getElementById('applyFilterBtn').addEventListener('click', function() {
        redirectToManipulationPage('apply_filter.html');
    });

    document.getElementById('compressImageBtn').addEventListener('click', function() {
        redirectToManipulationPage('compress_image.html');
    });

    document.getElementById('cropImageBtn').addEventListener('click', function() {
        redirectToManipulationPage('crop_image.html');
    });

    document.getElementById('convertToPdfButton').addEventListener('click', function() {
        convertImageToPDF();
    });
});

function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}

function convertImageToPDF() {
    const pdfContent = 'This is a placeholder for what would be the binary content of a PDF file.';
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_image.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}