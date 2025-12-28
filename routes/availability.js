const express = require('express');
const availabilityService = require('../services/availabilityService');

const router = express.Router();

// GET /api/availability - Get availability for stylist and date
router.get('/availability', (req, res) => {
    try {
        const { stylistId, date } = req.query;

        if (!stylistId || !date) {
            return res.status(400).json({
                success: false,
                error: 'stylistId and date are required'
            });
        }

        const availability = availabilityService.getAvailability(parseInt(stylistId), date);
        res.json({
            success: true,
            data: availability
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch availability'
        });
    }
});

module.exports = router;