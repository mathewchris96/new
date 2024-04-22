app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const targetFormat = 'jpeg'; // Explicitly setting targetFormat to 'jpeg' for JPG conversion
  const image = await loadImage(req.file.path);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  
  const outputPath = req.file.path.replace(path.extname(req.file.originalname), `.jpeg`);
  const out = fs.createWriteStream(outputPath);
  
  // Since we're focusing on converting to JPEG, directly use createJPEGStream()
  const stream = canvas.createJPEGStream();
  stream.pipe(out);

  out.on('finish', () => {
    fs.unlinkSync(req.file.path); // Delete the original file
    // Adding necessary headers for facilitating the download
    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename=' + path.basename(outputPath));
    res.download(outputPath, (err) => {
      if (err) throw err;
      fs.unlinkSync(outputPath); // Delete the converted file after sending
    });
  });
});
```