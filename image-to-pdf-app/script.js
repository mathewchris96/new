
document.addEventListener("DOMContentLoaded", function() {
    const uploadInput = document.getElementById("jpeg-upload");
    const convertButton = document.getElementById("convert-button");
    const downloadLink = document.getElementById("download-link");

    // Validate the file input to ensure it's a JPEG file
    uploadInput.addEventListener("change", function() {
        const file = uploadInput.files[0];
        if (file.type !== "image/jpeg") {
            alert("Please select a JPEG file.");
            uploadInput.value = ""; // Reset the input
        }
    });

    // Convert the uploaded JPEG to PDF
    convertButton.addEventListener("click", function() {
        const file = uploadInput.files[0];
        if (!file) {
            alert("Please upload a JPEG file first.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const imgData = event.target.result;
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4'
            });

            // Calculate the PDF width and height to maintain the image aspect ratio
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            const pdfBlob = pdf.output('blob');

            // Create a download link for the PDF
            const pdfUrl = URL.createObjectURL(pdfBlob);
            downloadLink.href = pdfUrl;
            downloadLink.download = "converted.pdf";
            downloadLink.innerHTML = "Download PDF";
            downloadLink.style.display = "block";
        };
        reader.readAsDataURL(file);
    });
});