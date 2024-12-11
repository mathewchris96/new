# Image Manipulation App

This document provides instructions on how to set up and run the Image Manipulation App, a web application that allows users to upload images and perform various manipulations such as resizing, converting formats, applying filters, cropping, and compressing images.

## Prerequisites

Before you begin, ensure you have Node.js installed on your system. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).

## Installation

1. Clone the repository or download the source code to your local machine.
2. Navigate to the root directory of the project in your terminal.
3. Run `npm install` to install the required dependencies listed in `package.json`.

## Running the Application

1. In the root directory of the project, run `npm start` to start the server.
2. Open a web browser and go to `http://localhost:3000` to access the application.

## Using the Application

### Uploading an Image

- Navigate to the **Upload Image** section by clicking on the corresponding navigation link.
- Click on the "Choose File" button and select an image from your local device.
- Click on the "Upload Image" button to upload the selected image.

### Manipulating an Image

After uploading an image, you will be redirected to the **Manipulation Options** page where you can choose from different manipulation options:

- **Resize Image**: Allows you to resize the uploaded image.
- **Convert to JPG**: Converts the uploaded image to JPG format.
- **Convert to PNG**: Converts the uploaded image to PNG format.
- **Apply Filter**: Applies a black and white filter to the uploaded image.
- **Compress Image**: Compresses the uploaded image to reduce file size.
- **Crop Image**: Allows you to crop the uploaded image.

Select the desired manipulation option by clicking on the corresponding button. After the manipulation is performed, you will have the option to download the manipulated image.

## Downloading the Manipulated Image

- Once an image manipulation is completed, a "Download Image" button will appear.
- Click on the "Download Image" button to download the manipulated image to your local device.

## Architecture

The application is built using HTML, CSS, and JavaScript for the frontend, with Node.js, Express, and the Canvas API for the backend and image manipulation functionalities.

## Dependencies

- **Express**: Used to set up the server and handle routing.
- **Multer**: Used for handling image uploads.
- **Canvas**: Used for performing image manipulations.

For more details on the application's architecture and dependencies, refer to the `package.json` and `server.js` files.

## Contributing

Contributions to the Image Manipulation App are welcome. Please feel free to fork the repository, make changes, and submit pull requests.

## License

This project is licensed under the ISC License. See the `LICENSE` file for more details.
```