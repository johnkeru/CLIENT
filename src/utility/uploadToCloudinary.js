import axios from 'axios';

const uploadToCloudinary = async (file) => {
    const uploadURL = "https://api.cloudinary.com/v1_1/daem3tpao/image/upload";
    const uploadPreset = "nukutm1t";

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await axios.post(uploadURL, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        console.log(response);
        return response.data.secure_url;
    } catch (error) {
        return 'error';
    }
};

export default uploadToCloudinary;
