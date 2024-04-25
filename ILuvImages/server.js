const express = require('express');
const multer = require('multer');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const app = express();
const port = 3000;

// Set up storage engine for multer to handle file uploads.
// Files will be stored in the 'uploads/' directory with a unique name based on the upload time.
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer with the defined storage engine.
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory.
app.use(express.static('public'));

// Endpoint to handle file uploads. Single image file expected.
// On successful upload, responds with the file path and a success message.
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send({ filePath: `/uploads/${req.file.filename}`, message: 'File uploaded successfully.' });
});

// Endpoint to convert uploaded images to a specified format (default: png).
// The original file is deleted after conversion.
// Responds with the converted file for download.
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
  
  let stream;
  if (targetFormat === 'jpeg') {
    stream = canvas.createJPEGStream();
  } else {
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

// Additional manipulation endpoints follow a similar pattern.
// Each endpoint should receive an image file, perform the specified manipulation, and respond accordingly.

app.post('/resize', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  const resizeStream = fs.createReadStream(req.file.path).pipe(sharp().resize(width, height));
  const outputPath = `resized-${req.file.filename}`;
  resizeStream.pipe(fs.createWriteStream(outputPath)).on('finish', () => {
    res.download(outputPath, (err) => {
      if (err) throw err;
      fs.unlinkSync(outputPath); // Delete the resized file after sending
    });
  });
});

app.post('/compress', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const outputPath = `compressed-${req.file.filename}`;
  fs.createReadStream(req.file.path)
    .pipe(sharp().jpeg({ quality: 50 })) // Example compression using Sharp
    .pipe(fs.createWriteStream(outputPath))
    .on('finish', () => {
      res.download(outputPath, (err) => {
        if (err) throw err;
        fs.unlinkSync(outputPath); // Delete the compressed file after sending
      });
    });
});

app.post('/apply-filter', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  // Example of applying a simple grayscale filter
  const outputPath = `filtered-${req.file.filename}`;
  fs.createReadStream(req.file.path)
    .pipe(sharp().grayscale()) // Applying grayscale filter
    .pipe(fs.createWriteStream(outputPath))
    .on('finish', () => {
        res.download(outputPath, (err) => {
            if (err) throw err;
            fs.unlinkSync(outputPath); // Delete the filtered file after sending
        });
    });
});

app.post('/crop', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const width = parseInt(req.body.width, 10);
  const height = parseInt(req.body.height, 10);
  const left = parseInt(req.body.left, 10);
  const top = parseInt(req.body.top, 10);
  const outputPath = `cropped-${req.file.filename}`;
  fs.createReadStream(req.file.path)
    .pipe(sharp().extract({ width: width, height: height, left: left, top: top })) // Cropping logic
    .pipe(fs.createWriteStream(outputPath))
    .on('finish', () => {
        res.download(outputPath, (err) => {
            if (err) throw err;
            fs.unlinkSync(outputPath); // Delete the cropped file after sending
        });
    });
});

// Start the server on the specified port and log a message to the console.
app.listen(port, () => {
  console.log(`ILuvImages server running at http://localhost:${port}`);
});
```