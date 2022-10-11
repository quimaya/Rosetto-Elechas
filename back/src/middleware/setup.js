const cloudinary = require("cloudinary");


const setUpCloudinary = () => {

    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });}
    
    module.exports = {setUpCloudinary} 
    
    //Exportamos la configuración de Cloudinary para llevarlo a Index
    