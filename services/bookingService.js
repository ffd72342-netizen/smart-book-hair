const services = require('../data/services');
const stylists = require('../data/stylists');
const bookingsData = require('../data/bookings');

// Service for handling booking logic
class BookingService {
    createBooking(bookingData) {
        // Validate service exists
        const service = services.find(s => s.id === bookingData.serviceId);
        if (!service) {
            throw new Error('Service not found');
        }

        // Validate stylist exists
        const stylist = stylists.find(s => s.id === bookingData.stylistId);
        if (!stylist) {
            throw new Error('Stylist not found');
        }

        // Check if stylist offers this service
        if (!stylist.specialties.includes(service.category)) {
            throw new Error('Stylist does not offer this service');
        }

        // Calculate total price and duration
        const totalPrice = service.price;
        const totalDuration = service.duration;

        const booking = {
            ...bookingData,
            service: service.name,
            stylist: stylist.name,
            totalPrice,
            totalDuration,
            status: 'confirmed'
        };

        return bookingsData.addBooking(booking);
    }

    getBookings() {
        return bookingsData.getBookings();
    }

    getBookingById(id) {
        return bookingsData.getBookingById(id);
    }
}

module.exports = new BookingService();