document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById("file-input");
    const convertBtn = document.getElementById("convertBtn");
    const uploadForm = document.getElementById("upload-form");
    const downloadButton = document.getElementById("download-pdf-button");

    downloadButton.disabled = true;

    convertBtn.addEventListener("click", function() {
        if (fileInput.files && fileInput.files[0]) {
            const file = fileInput.files[0];
            if (file.type !== "image/jpeg") {
                alert("Only JPEG files are supported.");
                return;
            }

            simulateConversionToPDF(file).then((pdfFile) => {
                downloadButton.disabled = false;

                downloadButton.href = pdfFile; // Assuming a URL or data URI is returned for simplicity
                downloadButton.download = "converted_file.pdf";
                downloadButton.addEventListener("click", function() {
                    console.log("Downloading PDF...");
                });

                alert("File converted to PDF successfully. You can now download the PDF.");
            }).catch(error => {
                console.error("Error converting file:", error);
                alert("An error occurred during the conversion process.");
            });
        }
    });

    uploadForm.addEventListener("submit", function(event) {
        event.preventDefault();
    });

    function simulateConversionToPDF(file) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const pdfFile = "path_to_converted_file.pdf"; // Assuming the file path or data URI for the converted PDF
                resolve(pdfFile);
            }, 1000);
        });
    }
});