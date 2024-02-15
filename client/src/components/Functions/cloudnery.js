const cloudinary = require('cloudinary-core');

// Function to create and initialize Cloudinary instance
const createCloudinaryInstance = () => {
  return new cloudinary.Cloudinary({ 
    cloud_name: 'detjwtn7c', 
    api_key: '383326321776236', 
    api_secret: 'JyEerDTSNT3fFEjPsbo0C32H57o' 
  });
};

const uploadImageToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    // Create and initialize the Cloudinary instance
    const cl = createCloudinaryInstance();

    // Ensure that cl.uploader is defined before calling upload
    if (cl.uploader) {
      // Uploading an image using the new syntax
      cl.uploader.upload(file, function(error, result) {
        if (error) {
          reject(error);
        } else {
          // Resolve with the URL of the uploaded image
          resolve(result.secure_url);
        }
      });
    } else {
      reject(new Error('Cloudinary uploader not available'));
    }
  });
};

module.exports = uploadImageToCloudinary;
