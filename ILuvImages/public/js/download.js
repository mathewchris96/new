function triggerDownload(imageName) {
  // Assuming imageName is the name of the converted image file
  const downloadLink = document.createElement('a');
  downloadLink.href = `./${imageName}`;
  downloadLink.download = imageName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export { triggerDownload };
```