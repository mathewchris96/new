// manipulation.js

document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to manipulation option buttons
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
});

/**
 * Redirects the user to the specified manipulation page.
 * @param {string} pageName - The name of the page to redirect to.
 */
function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}