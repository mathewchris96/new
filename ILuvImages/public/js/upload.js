// upload.js

document.addEventListener("DOMContentLoaded", function() {
    // Select the file input and the form element
    const fileInput = document.getElementById("file-input");
    const uploadForm = document.getElementById("upload-form");

    // Listen for file input change events
    fileInput.addEventListener("change", function() {
        // Check if files are selected
        if (this.files && this.files[0]) {
            // Instantiate FormData object
            const formData = new FormData();
            // Append the file to the FormData object
            formData.append("image", this.files[0]);

            // Perform the AJAX request to upload the image
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Check if the upload was successful
                if (data.success) {
                    // Redirect to the manipulation options page
                    window.location.href = "/manipulation_options.html";
                } else {
                    // Handle errors or unsuccessful uploads
                    alert("Failed to upload image. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                alert("An error occurred while uploading the image.");
            });
        }
    });

    // Prevent the form from submitting traditionally
    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
});