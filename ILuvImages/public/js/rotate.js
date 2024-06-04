let currentDegree = 0;

document.getElementById('rotateButton').addEventListener('click', rotateImage);
document.getElementById('downloadButton').addEventListener('click', downloadImage);

function rotateImage() {
    const image = document.getElementById('imageToRotate');
    currentDegree = (currentDegree + 90) % 360;
    image.style.transform = `rotate(${currentDegree}deg)`;
}

function downloadImage() {
    const image = document.getElementById('imageToRotate');
    // Assuming the image source is in the same directory
    const imageName = image.src.split('/').pop();
    const a = document.createElement('a');
    a.href = image.src;
    // There might be a better way to handle filenames, especially if they are dynamically generated or if the path is complex
    a.download = `Rotated-${currentDegree}-${imageName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
```