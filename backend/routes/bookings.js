const express = require('express');
const bookingService = require('../services/bookingService');

const router = express.Router();

// GET /api/bookings - Get all bookings (admin only, simplified)
router.get('/bookings', (req, res) => {
    try {
        const bookings = bookingService.getBookings();
        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch bookings'
        });
    }
});

// POST /api/bookings - Create new booking
router.post('/bookings', (req, res) => {
    try {
        const { customerName, customerEmail, serviceId, stylistId, date, time } = req.body;

        // Validate required fields
        if (!customerName || !customerEmail || !serviceId || !stylistId || !date || !time) {
            return res.status(400).json({
                success: false,
                error: 'All fields are required'
            });
        }

        const booking = bookingService.createBooking({
            customerName,
            customerEmail,
            serviceId: parseInt(serviceId),
            stylistId: parseInt(stylistId),
            date,
            time
        });

        res.status(201).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to create booking'
        });
    }
});

// GET /api/bookings/:id - Get booking by ID
router.get('/bookings/:id', (req, res) => {
    try {
        const booking = bookingService.getBookingById(req.params.id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                error: 'Booking not found'
            });
        }
        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch booking'
        });
    }
});

module.exports = router;