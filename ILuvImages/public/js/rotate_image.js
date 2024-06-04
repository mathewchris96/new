// Function to handle image upload and display it on the canvas
function handleImageUpload(event) {
  event.preventDefault(); // Prevent the default form submission
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.onload = function(event) {
    let img = new Image();
    img.onload = function() {
      displayImageOnCanvas(img);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

// Function to display the uploaded image on the canvas
function displayImageOnCanvas(img) {
  let canvas = document.getElementById('imageCanvas');
  let ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
}

// Function to rotate the image by 90 degrees clockwise upon button click
function rotateImage() {
  let canvas = document.getElementById('imageCanvas');
  let ctx = canvas.getContext('2d');
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = imgData.height;
  canvas.height = imgData.width;
  ctx.rotate(90 * Math.PI / 180);
  ctx.drawImage(imgData, 0, -imgData.height);
}

// Function to enable image download after rotation
function enableImageDowload() {
  let canvas = document.getElementById('imageCanvas');
  let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  let downloadLink = document.createElement('a');
  downloadLink.href = image;
  downloadLink.download = 'rotated-image.png';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Interaction with the DOM of `rotate_image.html` to update the image display and respond to user interactions
document.getElementById('uploadForm').addEventListener('submit', handleImageUpload);
document.getElementById('rotateButton').addEventListener('click', rotateImage);
document.getElementById('downloadButton').addEventListener('click', enableImageDowload);
```