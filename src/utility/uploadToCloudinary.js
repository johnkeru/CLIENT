import axios from 'axios';
import loadEnv from './loadEnv';

const uploadToCloudinary = async (file) => {
    const uploadURL = `https://api.cloudinary.com/v1_1/${loadEnv('VITE_CLOUDINARY_NAME')}/image/upload`;
    const uploadPreset = loadEnv('VITE_CLOUDINARY_PRESET');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(uploadURL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data.secure_url;
    } catch (error) {
        return 'error';
    }
};

export default uploadToCloudinary;
