const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createCanvas, loadImage } = require('canvas');

const app = express();
const port = 3000;

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Serve static files from public directory
app.use(express.static('public'));

// Root route serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for uploading images
app.post('/upload', upload.single('image'), (req, res) => {
  res.json({ message: 'Image uploaded successfully', filePath: req.file.path });
});

// Route for converting image to JPG
app.post('/convert-to-jpg', upload.single('image'), async (req, res) => {
  try {
    const outputPath = req.file.path.replace(path.extname(req.file.originalname), '.jpg');
    await sharp(req.file.path).toFormat('jpeg').toFile(outputPath);
    res.json({ message: 'Image converted to JPG successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to convert image to JPG', error: error.message });
  }
});

// Route for converting image to PNG
app.post('/convert-to-png', upload.single('image'), async (req, res) => {
  try {
    const outputPath = req.file.path.replace(path.extname(req.file.originalname), '.png');
    await sharp(req.file.path).toFormat('png').toFile(outputPath);
    res.json({ message: 'Image converted to PNG successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to convert image to PNG', error: error.message });
  }
});

// Additional image manipulation routes
// Route for resizing images
app.post('/resize', upload.single('image'), async (req, res) => {
  try {
    const { width, height } = req.body; // Expecting width and height in the request body
    const outputPath = `uploads/resized-${Date.now()}${path.extname(req.file.originalname)}`;
    await sharp(req.file.path).resize(parseInt(width, 10), parseInt(height, 10)).toFile(outputPath);
    res.json({ message: 'Image resized successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to resize image', error: error.message });
  }
});

// Route for cropping images
app.post('/crop', upload.single('image'), async (req, res) => {
  try {
    const { width, height, left, top } = req.body; // Expecting width, height, left, and top in the request body
    const outputPath = `uploads/cropped-${Date.now()}${path.extname(req.file.originalname)}`;
    await sharp(req.file.path).extract({ width: parseInt(width, 10), height: parseInt(height, 10), left: parseInt(left, 10), top: parseInt(top, 10) }).toFile(outputPath);
    res.json({ message: 'Image cropped successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to crop image', error: error.message });
  }
});

// Route for applying filters to images
app.post('/apply-filter', upload.single('image'), async (req, res) => {
  try {
    const { filterType } = req.body; // Expect filterType in the request body
    const outputPath = `uploads/filtered-${Date.now()}${path.extname(req.file.originalname)}`;
    let image = sharp(req.file.path);
    switch (filterType.toLowerCase()) {
      case 'grayscale':
        image = image.grayscale();
        break;
      // Additional filters can be added here
      default:
        throw new Error('Invalid filter type');
    }
    await image.toFile(outputPath);
    res.json({ message: 'Filter applied successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: `Failed to apply filter: ${error.message}`, error: error.message });
  }
});

// Route for compressing images
app.post('/compress', upload.single('image'), async (req, res) => {
  try {
    const outputPath = `uploads/compressed-${Date.now()}${path.extname(req.file.originalname)}`;
    await sharp(req.file.path).jpeg({ quality: 50 }).toFile(outputPath); // Compresses image to 50% quality
    res.json({ message: 'Image compressed successfully', filePath: outputPath });
  } catch (error) {
    res.status(500).json({ message: 'Failed to compress image', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Image manipulation app listening at http://localhost:${port}`);
});
```