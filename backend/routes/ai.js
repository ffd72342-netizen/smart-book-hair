const express = require('express');
const aiService = require('../services/aiService');

const router = express.Router();

// POST /api/ai/recommendation - Get AI recommendation
router.post('/ai/recommendation', (req, res) => {
    try {
        const { hairType, preferences, budget, occasion } = req.body;

        if (!hairType || !preferences) {
            return res.status(400).json({
                success: false,
                error: 'hairType and preferences are required'
            });
        }

        const recommendation = aiService.generateRecommendation({
            hairType,
            preferences,
            budget: budget ? parseInt(budget) : null,
            occasion
        });

        res.json({
            success: true,
            data: recommendation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to generate recommendation'
        });
    }
});

module.exports = router;