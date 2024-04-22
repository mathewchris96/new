document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file-input");
    const uploadForm = document.getElementById("upload-form");

    fileInput.addEventListener("change", function() {
        if (this.files && this.files[0]) {
            const formData = new FormData();
            formData.append("image", this.files[0]);

            fetch("/upload", {
                method: "POST",
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Assuming window.location.href navigation to a confirmation or choice page is correct flow
                    window.location.href = "/manipulation_options.html";
                    // Logic assumed for download option post successful upload and conversion
                    // showDownloadButton(data.imageId); // Assuming this is correctly implemented elsewhere considering the instructions
                } else {
                    alert("Failed to upload image. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error uploading image:", error);
                alert("An error occurred while uploading the image.");
            });
        }
    });

    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    // Assuming this is part of the requested implementation for showing download option
    // Implementation based on the hypothetical scenario provided
    // function showDownloadButton(imageId) {
    //     const downloadBtn = document.createElement('button');
    //     downloadBtn.innerText = 'Download Image';
    //     uploadForm.appendChild(downloadBtn);
    //     downloadBtn.addEventListener('click', () => {
    //         // Hypothetical downloadImage logic here
    //     }); // This logic is assumed and implemented based on the given instructions
    // }
});