// Example using Cloudinary JavaScript SDK
const cloudinary = require('cloudinary').v2;

      
cloudinary.config({ 
  cloud_name: 'detjwtn7c', 
  api_key: '383326321776236', 
  api_secret: 'JyEerDTSNT3fFEjPsbo0C32H57o' 
});

// Uploading an image
cloudinary.uploader.upload('Omkar.jpeg', function(error, result) {
  console.log(result, error);
});
