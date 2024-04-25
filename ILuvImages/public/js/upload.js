document.addEventListener("DOMContentLoaded", function() {
    // This script is responsible for handling the file upload process.
    // It listens for file selection in the input field and submits the file
    // to the server using AJAX, thus avoiding a full page reload.

    // Select the file input and the form element
    const fileInput = document.getElementById("file-input");
    const uploadForm = document.getElementById("upload-form");

    // Listen for file input change events
    fileInput.addEventListener("change", function() {
        // Check if files are selected
        if (this.files && this.files[0]) {
            // Instantiate FormData object for sending file data
            const formData = new FormData();
            // Append the selected file to the FormData object
            // The 'image' key should match the server's expectation for the file parameter
            formData.append("image", this.files[0]);

            // Perform the AJAX request to upload the image
            fetch("/upload", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                // Check if the upload was successful based on server response
                if (data.success) {
                    // Redirect to the manipulation options page upon successful upload
                    window.location.href = "/manipulation_options.html";
                } else {
                    // Display an error message if the upload was unsuccessful
                    alert("Failed to upload image. Please try again.");
                }
            })
            .catch(error => {
                // Log and alert the user of any error during the upload process
                console.error("Error uploading image:", error);
                alert("An error occurred while uploading the image.");
            });
        }
    });

    // Prevent the form from submitting traditionally to avoid page reload
    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });
});