const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Set up storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload
const upload = multer({ storage: storage });

// Serve static files
app.use(express.static('public'));

// Upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: `/uploads/${req.file.filename}`, message: 'File uploaded successfully.' });
});

// Image manipulation endpoints
app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const targetFormat = req.body.targetFormat || 'png';
  const image = await loadImage(req.file.path);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  
  const outputPath = req.file.path.replace(path.extname(req.file.originalname), `.${targetFormat}`);
  const out = fs.createWriteStream(outputPath);
  
  // Handle different formats dynamically based on `targetFormat`
  let stream;
  if (targetFormat === 'jpeg') {
    stream = canvas.createJPEGStream();
  } else { // Default to PNG if not specified or if specified format isn't supported
    stream = canvas.createPNGStream();
  }
  stream.pipe(out);

  out.on('finish', () => {
    fs.unlinkSync(req.file.path); // Delete the original file
    res.download(outputPath, (err) => {
      if (err) throw err;
      fs.unlinkSync(outputPath); // Delete the converted file after sending
    });
  });
});

// Additional manipulation endpoints like resize, compress, apply filter, crop can be added here following the same pattern
// Below is a simplistic implementation for displaying how additional endpoints could be structured
app.post('/resize', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Implement resize logic here
  res.send('Image resized successfully.');
});

app.post('/compress', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Implement compress logic here
  res.send('Image compressed successfully.');
});

app.post('/apply-filter', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Implement apply-filter logic here
  res.send('Filter applied to image successfully.');
});

app.post('/crop', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Implement crop logic here
  res.send('Image cropped successfully.');
});

app.listen(port, () => {
  console.log(`ILuvImages server running at http://localhost:${port}`);
});
```