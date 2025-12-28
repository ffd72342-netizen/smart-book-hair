const express = require('express');
const services = require('../data/services');

const router = express.Router();

// GET /api/services - Get all services
router.get('/services', (req, res) => {
    try {
        res.json({
            success: true,
            data: services
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch services'
        });
    }
});

// GET /api/services/:id - Get service by ID
router.get('/services/:id', (req, res) => {
    try {
        const service = services.find(s => s.id === parseInt(req.params.id));
        if (!service) {
            return res.status(404).json({
                success: false,
                error: 'Service not found'
            });
        }
        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch service'
        });
    }
});

module.exports = router;