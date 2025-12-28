// Main JavaScript - Common functionality
import {
    getServices,
    getServiceById,
    getStylists,
    getStylistById,
    getAvailability,
    bookAppointment,
    getBookings,
    getAIRecommendation,
    sendContactMessage
} from './mock-api.js';

// Navigation active state management
function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Utility functions for API calls (now using mock functions)
export async function apiCall(endpoint, options = {}) {
    // Parse endpoint and query parameters
    const [path, queryString] = endpoint.split('?');
    const queryParams = {};
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            queryParams[key] = decodeURIComponent(value);
        });
    }

    // Handle different endpoints
    if (path === '/services') {
        return await getServices();
    }

    if (path === '/stylists') {
        return await getStylists();
    }

    if (path === '/bookings') {
        if (options.method === 'POST') {
            const bookingData = JSON.parse(options.body);
            return await bookAppointment(bookingData);
        }
        return await getBookings();
    }

    if (path === '/availability') {
        return await getAvailability(queryParams.stylistId, queryParams.date);
    }

    if (path === '/ai/recommendation') {
        if (options.method === 'POST') {
            const input = JSON.parse(options.body);
            return await getAIRecommendation(input);
        }
        return await getAIRecommendation(queryParams.input || '');
    }

    if (path === '/contact') {
        if (options.method === 'POST') {
            const messageData = JSON.parse(options.body);
            return await sendContactMessage(messageData);
        }
    }

    // Handle dynamic endpoints with IDs
    const serviceMatch = path.match(/^\/services\/(\d+)$/);
    if (serviceMatch) {
        return await getServiceById(serviceMatch[1]);
    }

    const stylistMatch = path.match(/^\/stylists\/(\d+)$/);
    if (stylistMatch) {
        return await getStylistById(stylistMatch[1]);
    }

    throw new Error(`Unknown endpoint: ${endpoint}`);
}

// Loading state management
export function showLoading(element) {
    element.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
}

export function hideLoading(element) {
    // Loading will be replaced by actual content
}

// Error handling
export function showError(element, message) {
    element.innerHTML = `<div class="error">${message}</div>`;
}

// Format currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Format duration
export function formatDuration(minutes) {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
});