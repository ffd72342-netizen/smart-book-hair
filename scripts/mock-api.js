// Mock API - Frontend-only implementation
// This replaces all backend API calls with JavaScript functions

// Mock data
const mockServices = [
    {
        id: 1,
        name: 'Haircut',
        description: 'Professional haircut with styling',
        price: 35,
        duration: 30,
        category: 'hair'
    },
    {
        id: 2,
        name: 'Hair Color',
        description: 'Full hair coloring service',
        price: 80,
        duration: 120,
        category: 'hair'
    },
    {
        id: 3,
        name: 'Beard Trim',
        description: 'Precision beard trimming and shaping',
        price: 20,
        duration: 15,
        category: 'beard'
    },
    {
        id: 4,
        name: 'Facial',
        description: 'Relaxing facial treatment',
        price: 50,
        duration: 45,
        category: 'facial'
    },
    {
        id: 5,
        name: 'Manicure',
        description: 'Professional nail care and styling',
        price: 25,
        duration: 30,
        category: 'nails'
    },
    {
        id: 6,
        name: 'Massage',
        description: 'Therapeutic massage session',
        price: 60,
        duration: 60,
        category: 'wellness'
    }
];

const mockStylists = [
    {
        id: 1,
        name: 'Alex Johnson',
        specialties: ['haircut', 'styling'],
        rating: 4.8,
        experience: 5,
        bio: 'Expert in modern cuts and classic styles',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHA+U3R5bGlzdCAxPC9wPgo8L3N2Zz4='
    },
    {
        id: 2,
        name: 'Sarah Chen',
        specialties: ['color', 'haircut'],
        rating: 4.9,
        experience: 7,
        bio: 'Color specialist with artistic vision',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHA+U3R5bGlzdCAyPC9wPgo8L3N2Zz4='
    },
    {
        id: 3,
        name: 'Mike Rodriguez',
        specialties: ['beard', 'facial'],
        rating: 4.7,
        experience: 4,
        bio: 'Beard grooming and facial expert',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHA+U3R5bGlzdCAzPC9wPgo8L3N2Zz4='
    },
    {
        id: 4,
        name: 'Emma Davis',
        specialties: ['nails', 'wellness'],
        rating: 4.6,
        experience: 3,
        bio: 'Nail artist and wellness specialist',
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNjAiIGZpbGw9IiM2MzY2RjEiLz4KPHA+U3R5bGlzdCA0PC9wPgo8L3N2Zz4='
    }
];

// In-memory storage for bookings
let mockBookings = [];

// Mock API functions
export async function getServices() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
        success: true,
        data: mockServices
    };
}

export async function getServiceById(id) {
    await new Promise(resolve => setTimeout(resolve, 50));

    const service = mockServices.find(s => s.id === parseInt(id));
    if (!service) {
        return {
            success: false,
            error: 'Service not found'
        };
    }

    return {
        success: true,
        data: service
    };
}

export async function getStylists() {
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
        success: true,
        data: mockStylists
    };
}

export async function getStylistById(id) {
    await new Promise(resolve => setTimeout(resolve, 50));

    const stylist = mockStylists.find(s => s.id === parseInt(id));
    if (!stylist) {
        return {
            success: false,
            error: 'Stylist not found'
        };
    }

    return {
        success: true,
        data: stylist
    };
}

export async function getAvailability(stylistId, date) {
    await new Promise(resolve => setTimeout(resolve, 150));

    // Mock availability - return some random available slots
    const availableSlots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
        if (Math.random() > 0.3) { // 70% chance slot is available
            availableSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        }
    }

    return {
        success: true,
        data: {
            stylistId: parseInt(stylistId),
            date: date,
            availableSlots: availableSlots
        }
    };
}

export async function bookAppointment(bookingData) {
    await new Promise(resolve => setTimeout(resolve, 200));

    // Validate booking data
    if (!bookingData.serviceId || !bookingData.stylistId || !bookingData.date || !bookingData.time) {
        return {
            success: false,
            error: 'Missing required booking information'
        };
    }

    // Check if slot is still available (simple mock)
    const existingBooking = mockBookings.find(b =>
        b.stylistId === bookingData.stylistId &&
        b.date === bookingData.date &&
        b.time === bookingData.time
    );

    if (existingBooking) {
        return {
            success: false,
            error: 'This time slot is no longer available'
        };
    }

    // Create booking
    const newBooking = {
        id: Date.now().toString(),
        ...bookingData,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
    };

    mockBookings.push(newBooking);

    // Log the booking (as requested)
    console.log('New booking created:', newBooking);

    return {
        success: true,
        data: newBooking
    };
}

export async function getBookings() {
    await new Promise(resolve => setTimeout(resolve, 100));

    return {
        success: true,
        data: mockBookings
    };
}

export async function getAIRecommendation(input) {
    await new Promise(resolve => setTimeout(resolve, 300));

    let recommendation = '';
    let suggestedService = null;

    // Handle different input types
    if (typeof input === 'string') {
        // Simple string input
        const recommendations = {
            'haircut': 'I recommend our professional haircut service with Alex Johnson. He specializes in modern cuts.',
            'color': 'For hair coloring, Sarah Chen is our expert. She has 7 years of experience with artistic vision.',
            'beard': 'Mike Rodriguez is perfect for beard trimming. He provides precision grooming services.',
            'facial': 'Try our relaxing facial treatment with Mike Rodriguez for the best experience.',
            'nails': 'Emma Davis specializes in professional nail care and styling.',
            'massage': 'Our therapeutic massage session is highly recommended for relaxation.',
            'default': 'Based on your needs, I recommend booking a consultation with one of our expert stylists.'
        };
        recommendation = recommendations[input.toLowerCase()] || recommendations.default;
        suggestedService = mockServices.find(s =>
            recommendation.toLowerCase().includes(s.name.toLowerCase().split(' ')[0].toLowerCase())
        );
    } else if (typeof input === 'object') {
        // Complex input with preferences
        const { hairType, preferences, budget, occasion } = input;

        // Generate recommendation based on preferences
        if (preferences && preferences.includes('color')) {
            recommendation = 'Sarah Chen is our color specialist with 7 years of experience. She can help you achieve the perfect color for your ' + (occasion || 'style') + '.';
            suggestedService = mockServices.find(s => s.name === 'Hair Color');
        } else if (preferences && preferences.includes('beard')) {
            recommendation = 'Mike Rodriguez specializes in beard grooming and can give you a precise, professional trim.';
            suggestedService = mockServices.find(s => s.name === 'Beard Trim');
        } else if (hairType === 'short' || preferences && preferences.includes('haircut')) {
            recommendation = 'Alex Johnson is perfect for modern cuts. He has 5 years of experience with various styles.';
            suggestedService = mockServices.find(s => s.name === 'Haircut');
        } else {
            recommendation = 'Based on your preferences, I recommend consulting with one of our expert stylists for a personalized recommendation.';
        }

        if (budget && suggestedService && parseInt(budget) < suggestedService.price) {
            recommendation += ' Note: The recommended service is within your budget.';
        }
    }

    return {
        success: true,
        data: {
            input: input,
            recommendation: recommendation,
            suggestedService: suggestedService,
            confidence: Math.floor(Math.random() * 20) + 80 // 80-99% confidence
        }
    };
}

export async function sendContactMessage(messageData) {
    await new Promise(resolve => setTimeout(resolve, 150));

    // Mock sending contact message
    console.log('Contact message received:', messageData);

    return {
        success: true,
        data: {
            message: 'Thank you for your message. We will get back to you within 24 hours.',
            timestamp: new Date().toISOString()
        }
    };
}