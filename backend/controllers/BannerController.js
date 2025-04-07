import Banner from '../models/BannerModel.js';
import fs from 'fs';
import path from 'path';

// Create Banner
export const createBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        
        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const banner = new Banner({
            title,
            description,
            image: req.file.path
        });

        await banner.save();
        res.status(201).json(banner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get All Banners
export const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Single Banner
export const getBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        res.status(200).json(banner);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Banner
export const updateBanner = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updates = { title, description };

        if (req.file) {
            // Delete old image if new one is uploaded
            const banner = await Banner.findById(req.params.id);
            if (banner?.image) {
                fs.unlinkSync(banner.image);
            }
            updates.image = req.file.path;
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            req.params.id,
            updates,
            { new: true }
        );

        if (!updatedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        res.status(200).json(updatedBanner);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Banner
export const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        
        if (!banner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // Delete associated image
        if (banner.image) {
            fs.unlinkSync(banner.image);
        }

        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};