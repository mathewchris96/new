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

    document.getElementById('convertToPdfBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_pdf.html');
    });

    document.getElementById('convertToPdfForm').addEventListener('submit', function(event) {
        event.preventDefault();
        convertImageToPDF();
    });
});

function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}

function convertImageToPDF() {
    console.log("Simulating image to PDF conversion...");
}