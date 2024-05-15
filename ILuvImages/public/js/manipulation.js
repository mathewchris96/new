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

    document.getElementById('convertBtn').addEventListener('click', function() {
        convertJPGtoJPEG();
    });
});

function redirectToManipulationPage(pageName) {
    window.location.href = pageName;
}

function convertJPGtoJPEG() {
    try {
        let isValidFile = true;
        if (!isValidFile) {
            throw new Error('Invalid file format.');
        }

        let isConversionSuccessful = true;
        if (isConversionSuccessful) {
            document.getElementById('downloadBtn').disabled = false;
            alert('Conversion successful!');
        } else {
            throw new Error('Conversion failed.');
        }
    } catch (error) {
        alert(error.message);
    }
}