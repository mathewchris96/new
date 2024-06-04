// imageToPdf.js

// Import necessary libraries
import jsPDF from 'jspdf';

// Define the function to convert image to PDF
async function convertImageToPDF(imageFile) {
    // Validate file type
    if (imageFile.type !== 'image/png') {
        throw new Error('Invalid file type. Only PNG files are supported.');
    }

    // Convert to PDF using jsPDF
    const pdf = new jsPDF();
    pdf.addImage(imageFile, 'PNG', 0, 0);
    
    // Trigger download of the PDF
    pdf.save('converted_image.pdf');
}

// Export the function for use in other files
export { convertImageToPDF };