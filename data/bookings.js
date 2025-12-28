// In-memory storage for bookings
let bookings = [];

module.exports = {
    bookings,
    addBooking: (booking) => {
        const newBooking = {
            id: Date.now().toString(),
            ...booking,
            createdAt: new Date().toISOString()
        };
        bookings.push(newBooking);
        return newBooking;
    },
    getBookings: () => bookings,
    getBookingById: (id) => bookings.find(b => b.id === id),
    updateBooking: (id, updates) => {
        const index = bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            bookings[index] = { ...bookings[index], ...updates };
            return bookings[index];
        }
        return null;
    },
    deleteBooking: (id) => {
        const index = bookings.findIndex(b => b.id === id);
        if (index !== -1) {
            return bookings.splice(index, 1)[0];
        }
        return null;
    }
};