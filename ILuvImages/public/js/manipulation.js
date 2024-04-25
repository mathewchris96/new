document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners to manipulation option buttons
    // Each button redirects the user to a specific image manipulation feature page.

    // Resize Image Button - Redirects to the page where users can resize their images.
    document.getElementById('resizeBtn').addEventListener('click', function() {
        redirectToManipulationPage('resize_image.html');
    });

    // Convert to PNG Button - Redirects to the page for converting images to PNG format.
    document.getElementById('convertToPngBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_png.html');
    });

    // Convert to JPG Button - Redirects to the page for converting images to JPG format.
    document.getElementById('convertToJpgBtn').addEventListener('click', function() {
        redirectToManipulationPage('convert_to_jpg.html');
    });

    // Apply Filter Button - Redirects to the page where users can apply filters to their images.
    document.getElementById('applyFilterBtn').addEventListener('click', function() {
        redirectToManipulationPage('apply_filter.html');
    });

    // Compress Image Button - Redirects to the page for compressing images to reduce file size.
    document.getElementById('compressImageBtn').addEventListener('click', function() {
        redirectToManipulationPage('compress_image.html');
    });

    // Crop Image Button - Redirects to the page where users can crop their images.
    document.getElementById('cropImageBtn').addEventListener('click', function() {
        redirectToManipulationPage('crop_image.html');
    });
});

/**
 * Redirects the user to the specified manipulation page.
 * This function is a utility to navigate between different image manipulation options.
 * @param {string} pageName - The name of the page to redirect to.
 */
function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}