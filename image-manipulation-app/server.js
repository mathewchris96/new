// Importing Express module
const express = require('express');
const path = require('path');
const multer = require('multer');

// Creating an instance of express
const app = express();

// Define the port to run the server on
const PORT = process.env.PORT || 3000;

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
});

// Initialize upload middleware with multer
const upload = multer({ storage: storage });

// Serving static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Route for the upload page
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('File uploaded successfully');
});

// Route for the resize page
app.get('/resize', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manipulate/resize.html'));
});

// Route for the convert page
app.get('/convert', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manipulate/convert.html'));
});

// Route for the compress page
app.get('/compress', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manipulate/compress.html'));
});

// Route for the apply filter page
app.get('/filter', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manipulate/filter.html'));
});

// Route for the crop page
app.get('/crop', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/manipulate/crop.html'));
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
```