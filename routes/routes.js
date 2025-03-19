import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Image from '../model/imageModel.js';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Multer Storage Setup for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads', // Folder name in your Cloudinary account
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const upload = multer({ storage });

// Test route
router.get('/', (req, res) => res.send('**Running**'))


// Upload Image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { path, filename } = req.file;

        // Save image details to MongoDB
        const image = new Image({ url: path, public_id: filename });
        await image.save();

        res.status(200).json({ message: 'Image uploaded successfully', image });
        console.log("saved")
    } catch (error) {
        res.status(500).json({ error: 'Image upload failed', details: error.message });
    }
});

// Fetch All Images
router.get('/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch images', details: error.message });
    }
});

// Delete Image
router.delete('/delete/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        console.log(image);

        if (!image) return res.status(404).json({ message: 'Image not found' });

        // Delete image from Cloudinary
        await cloudinary.uploader.destroy(image.public_id);

        // Remove image from MongoDB
        await image.deleteOne();

        res.status(200).json({ message: 'Image deleted successfully' });
        console.log("Image deleted successfully.");
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete image', details: error.message });
    }
});

export default router;

