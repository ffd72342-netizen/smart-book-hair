// Main JavaScript - Common functionality
import { API_BASE } from './config.js';

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

// Utility functions for API calls
export async function apiCall(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
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