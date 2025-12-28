const express = require('express');
const cors = require('cors');
const servicesRoutes = require('./routes/services');
const stylistsRoutes = require('./routes/stylists');
const availabilityRoutes = require('./routes/availability');
const bookingsRoutes = require('./routes/bookings');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend')); // Serve frontend files

// Routes
app.use('/api', servicesRoutes);
app.use('/api', stylistsRoutes);
app.use('/api', availabilityRoutes);
app.use('/api', bookingsRoutes);
app.use('/api', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;