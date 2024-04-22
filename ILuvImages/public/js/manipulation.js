document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to manipulation option buttons
    document.getElementById('resizeBtn').addEventListener('click', function() {
        redirectToManipulationPage('resize_image.html');
    });

    // Updated to include callback for download after conversion to PNG
    document.getElementById('convertToPngBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_png.html', downloadPNGImage);
    });

    // Updated to include callback for download after conversion to JPG
    document.getElementById('convertToJpgBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_jpg.html', downloadConvertedJPG);
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

/**
 * Redirects the user to the specified manipulation page and optionally calls a download function.
 * @param {string} pageName - The name of the page to redirect to.
 * @param {function} [downloadCallback] - Optional callback function for downloading the image after manipulation.
 */
function redirectToManipulationPage(pageName, downloadCallback) {
    window.location.href = pageName;
    // Check if a download callback function is provided
    if (downloadCallback) {
        // Call the provided download callback function
        downloadCallback();
    }
}

// Added for downloading converted JPG images, replacing downloadImageAfterConversion logic
function downloadConvertedJPG() {
    // Call to downloadConvertedJPG from download_image.js
    console.log('Downloading converted JPG image...');
}

// Added for downloading PNG images, replacing downloadImageAfterConversion logic
function downloadPNGImage() {
    // Call to downloadPNGImage from download_image.js
    console.log('Downloading PNG image...');
}