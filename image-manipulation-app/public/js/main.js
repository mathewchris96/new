// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const manipulationOptionsContainer = document.getElementById('manipulate'); // Change ID selection according to the instructions
    const manipulationForms = document.querySelectorAll('.manipulation-form');
    const resultContainer = document.getElementById('result-container');
    const resultImage = document.getElementById('result-image');
    const downloadButton = document.getElementById('download-button');

    // Event listener for the upload form submission
    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const file = fileInput.files[0];
        if (file) {
            uploadImage(file);
        } else {
            alert('Please select an image to upload.');
        }
    });

    // Function to upload image
    function uploadImage(file) {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                manipulationOptionsContainer.style.display = 'block';
                resultContainer.style.display = 'none';
                alert('Image uploaded successfully. Choose a manipulation option.');
            } else {
                alert('Failed to upload image.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error uploading image.');
        });
    }

    // Event listeners for manipulation options
    manipulationForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const manipulationType = this.getAttribute('data-manipulation-type');
            const formData = new FormData(this);
            performImageManipulation(manipulationType, formData);
        });
    });

    // Function to perform image manipulation
    function performImageManipulation(manipulationType, formData) {
        fetch(`/${manipulationType}`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                resultContainer.style.display = 'block';
                resultImage.src = data.imageUrl;
                downloadButton.href = data.imageUrl;
                downloadButton.download = 'manipulated-image';
                alert('Image manipulation successful.');
            } else {
                alert('Failed to manipulate image.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error manipulating image.');
        });
    }

    // Download button event listener
    downloadButton.addEventListener('click', function(e) {
        if (!resultImage.src) {
            e.preventDefault();
            alert('No image to download. Please perform an image manipulation first.');
        }
    });
});
```