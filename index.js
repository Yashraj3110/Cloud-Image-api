import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import uploadRoute from "./routes/routes.js"; // Importing correctly

dotenv.config();

const app = express();
app.use(express.json()); // Instead of body-parser

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// Routes
app.use('/', uploadRoute);

// cloudinary
import { v2 as cloudinary } from 'cloudinary';

(async function () {

    // Configuration
    cloudinary.config({
        cloud_name: 'dvurz2fdw',
        api_key: API_KEY,
        api_secret: API_SECRET
    });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });

    console.log(autoCropUrl);
})();

// Mongoose
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Database Active");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => console.log(error));