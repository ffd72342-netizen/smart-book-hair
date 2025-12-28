const express = require('express');
const stylists = require('../data/stylists');

const router = express.Router();

// GET /api/stylists - Get all stylists
router.get('/stylists', (req, res) => {
    try {
        res.json({
            success: true,
            data: stylists
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stylists'
        });
    }
});

// GET /api/stylists/:id - Get stylist by ID
router.get('/stylists/:id', (req, res) => {
    try {
        const stylist = stylists.find(s => s.id === parseInt(req.params.id));
        if (!stylist) {
            return res.status(404).json({
                success: false,
                error: 'Stylist not found'
            });
        }
        res.json({
            success: true,
            data: stylist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch stylist'
        });
    }
});

module.exports = router;