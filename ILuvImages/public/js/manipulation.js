document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('resizeBtn').addEventListener('click', function() {
        redirectToManipulationPage('resize_image.html');
    });

    document.getElementById('convertToPngBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_png.html');
    });

    document.getElementById('convertToJpegBtn').addEventListener('click', function() {
        convertImageToJPEG();
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
});

function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}

function convertImageToJPEG() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (file.type === "image/jpeg" || file.type === "image/jpg") {
            console.log("Converting image...");
            console.log("Download link for the converted image would be generated here.");
        } else {
            alert("Please upload a JPG image.");
        }
    } else {
        alert("Please select an image to convert.");
    }
}