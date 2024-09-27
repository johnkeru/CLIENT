import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import uploadToCloudinary from '../utility/uploadToCloudinary';
import api from '../configs/api'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../CONTEXT/UserContext';

const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    body: yup.string(),
    image: yup.mixed(),
});

const CreateBlog = () => {
    const { currentUser } = useUser()
    const [loading, setLoading] = useState(false)
    const [preview, setPreview] = useState('')
    const nav = useNavigate()
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors, },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onDrop = React.useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            setPreview(URL.createObjectURL(acceptedFiles[0]));
            setValue('image', acceptedFiles[0], { shouldValidate: true });
        }
    }, [setValue]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'], },
        maxSize: 10000000, //10MB
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            let formData = Object.assign(data, { user: currentUser._id })
            if (data.image) {
                let imageUrl = await uploadToCloudinary(data.image);
                if (imageUrl) {
                    formData = {
                        ...formData,
                        image: imageUrl, // Store only the secure URL
                    };
                }
            }
            api.post('/blogs', formData)
                .then(() => {
                    setLoading(false)
                    nav('/blogs')
                })
        } catch (error) {
            console.error('An error occurred during form submission', error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ maxWidth: 550, mx: 'auto', mt: 4, bgcolor: 'white', px: 5, py: 7, borderRadius: 2 }}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Create Blog Post
            </Typography>

            <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title ? errors.title.message : ''}
                    />
                )}
            />

            <Controller
                name="body"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ mb: 3 }}
                        label="Body"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        error={!!errors.body}
                        helperText={errors.body ? errors.body.message : ''}
                    />
                )}
            />

            <Box
                {...getRootProps()}
                sx={{
                    border: '2px dashed gray',
                    padding: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    marginBottom: 2,
                }}
            >
                <input {...getInputProps()} />
                <Typography>
                    Drag 'n' drop an image here, or click to select one (JPEG, PNG, GIF)
                </Typography>
                {errors.image && (
                    <Typography color="error" variant="body2">
                        {errors.image.message}
                    </Typography>
                )}
            </Box>

            {preview && (
                <Box sx={{ width: 200, height: 200, mx: 'auto', my: 2, backgroundImage: `url('${preview}')`, backgroundSize: 'cover', }} />
            )}

            <Button size='large' disabled={loading} type="submit" variant="contained" color="primary" fullWidth>
                {loading ? 'Loading...' : 'Submit'}
            </Button>
        </Box>
    );
};

export default CreateBlog;
