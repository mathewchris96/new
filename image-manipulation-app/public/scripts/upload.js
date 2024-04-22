// upload.js

document.addEventListener("DOMContentLoaded", function() {
    const uploadForm = document.getElementById("upload-form");
    const fileInput = document.getElementById("file-input");
    const uploadEndpoint = '/upload'; // Assuming there's an endpoint set up on the server for handling uploads

    // Validate file before uploading
    function validateFile(file) {
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSizeInBytes = 5e6; // 5MB

        if (!validTypes.includes(file.type)) {
            alert("Only JPG and PNG files are allowed.");
            return false;
        }

        if (file.size > maxSizeInBytes) {
            alert("The file is too large. Maximum size is 5MB.");
            return false;
        }

        return true;
    }

    // Function to upload file
    async function uploadFile(file) {
        if (!validateFile(file)) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(uploadEndpoint, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();
            alert('Upload successful!');

            // Redirecting user to manipulation options page with the image URL as a query parameter
            window.location.href = `/manipulate?imageUrl=${encodeURIComponent(result.imageUrl)}`;
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        }
    }

    // Event listener for form submission
    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const files = fileInput.files;
        if (files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }
        const file = files[0];
        uploadFile(file);
    });
});
```