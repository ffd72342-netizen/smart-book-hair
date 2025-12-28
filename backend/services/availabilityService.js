const services = require('../data/services');
const stylists = require('../data/stylists');

// Service for handling availability logic
class AvailabilityService {
    // Generate mock availability for a stylist on a given date
    getAvailability(stylistId, date) {
        const stylist = stylists.find(s => s.id === stylistId);
        if (!stylist) {
            throw new Error('Stylist not found');
        }

        // Mock working hours: 9 AM to 6 PM
        const workingHours = [];
        for (let hour = 9; hour < 18; hour++) {
            workingHours.push(`${hour}:00`);
            workingHours.push(`${hour}:30`);
        }

        // Randomly mark some slots as unavailable
        const availableSlots = workingHours.filter(() => Math.random() > 0.3);

        return {
            stylistId,
            date,
            availableSlots
        };
    }
}

module.exports = new AvailabilityService();