
// Importing jsPDF library
import jsPDF from 'jspdf';

// Function to handle the file upload event
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) {
    alert('Please select a JPEG file.');
    return;
  }

  // Check if the file is a JPEG
  if (file.type !== 'image/jpeg') {
    alert('The file must be a JPEG image.');
    return;
  }

  // Reading the uploaded JPEG file
  const reader = new FileReader();
  reader.onload = function(e) {
    convertToPDF(e.target.result, file.name);
  };
  reader.readAsDataURL(file);
}

// Function to convert the JPEG to PDF format using jsPDF
function convertToPDF(imageData, fileName) {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imageData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    const pdfBlob = pdf.output('blob');

    createDownloadLink(pdfBlob, fileName);
  } catch (error) {
    alert('An error occurred during the conversion process: ' + error.message);
  }
}

// Function to create a download link for the converted file
function createDownloadLink(pdfBlob, fileName) {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(pdfBlob);
  downloadLink.download = fileName.replace(/\.jpe?g$/, '.pdf');
  downloadLink.textContent = 'Download PDF';
  downloadLink.className = 'download-link';

  const downloadContainer = document.getElementById('download-container');
  downloadContainer.innerHTML = ''; // Clear previous links
  downloadContainer.appendChild(downloadLink);
}

// Adding event listener to the file input
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('file-input');
  if (fileInput) {
    fileInput.addEventListener('change', handleFileUpload);
  }
});