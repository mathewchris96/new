# ILuvImages Repository

Welcome to the ILuvImages repository, the ultimate tool for your image manipulation and conversion needs. This repository is designed to help you easily convert images between popular formats, apply various filters, compress, and crop images to fit your requirements.

## Main Features

ILuvImages offers a wide range of features to enhance and manipulate your images:

- **Image Conversion**: Convert your images to the most commonly used formats, including JPG and PNG. See `conversion.html` for more details on how to use this feature.
- **Applying Filters**: Add filters to your images to achieve the desired look. Check out `filters.html` for the available filters and how to apply them.
- **Compressing Images**: Reduce the file size of your images without losing quality. Visit `compress.html` for instructions on how to compress your images.
- **Cropping Images**: Crop your images to your preferred dimensions. `crop.html` provides a simple interface for cropping images.

## Running the Repository Locally

To run the ILuvImages repository on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the repository directory in your terminal or command prompt.
3. Start a local server to access the HTML files. If you have Python installed, you can run `python -m http.server` in the directory. Alternatively, use any other local server tool you prefer.

## Manipulation.js

The core functionality for image manipulation is provided by the `manipulation.js` file. This JavaScript file interacts with the HTML files mentioned above to enable the various image manipulation features. For example, in `manipulation_options.html`, you'll find options to select the type of manipulation you wish to perform on your image. The `manipulation.js` file listens for these selections and applies the chosen manipulation to your image.

## Troubleshooting

If you encounter any issues while trying to run the repository or access its features, here are a few common troubleshooting steps:

- Ensure you have a local server running to access the HTML files.
- Check if the JavaScript files are correctly linked in the HTML files.
- Verify that your browser supports the JavaScript features used in the repository.

## Navigation Links

To ensure a seamless navigation experience, all HTML files mentioned are linked within this README.md file:

- [Image Conversion](./conversion.html)
- [Applying Filters](./filters.html)
- [Compressing Images](./compress.html)
- [Cropping Images](./crop.html)

Please ensure that all function names and IDs used in the `manipulation.js` file are consistent with those referenced in the HTML files and this README.md. Adjustments should be made in the code to ensure consistency across all files if necessary.
```