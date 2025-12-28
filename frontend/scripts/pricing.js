// Pricing page JavaScript
import { apiCall, showLoading, showError, formatCurrency, formatDuration } from '../scripts/main.js';

document.addEventListener('DOMContentLoaded', () => {
    loadPricing();
});

async function loadPricing() {
    const container = document.getElementById('pricing-container');
    showLoading(container);

    try {
        const response = await apiCall('/services');

        if (response.success) {
            renderPricing(response.data);
        } else {
            showError(container, 'Failed to load pricing');
        }
    } catch (error) {
        showError(container, 'Unable to connect to server. Please try again later.');
    }
}

function renderPricing(services) {
    const container = document.getElementById('pricing-container');

    // Group services by category
    const categories = {};
    services.forEach(service => {
        if (!categories[service.category]) {
            categories[service.category] = [];
        }
        categories[service.category].push(service);
    });

    const pricingHTML = Object.entries(categories).map(([category, categoryServices]) => `
        <div class="pricing-category">
            <h3>${category.charAt(0).toUpperCase() + category.slice(1)} Services</h3>
            <div class="category-services">
                ${categoryServices.map(service => `
                    <div class="pricing-item">
                        <div class="service-info">
                            <h4>${service.name}</h4>
                            <p>${service.description}</p>
                            <div class="service-duration">${formatDuration(service.duration)}</div>
                        </div>
                        <div class="service-price">${formatCurrency(service.price)}</div>
                        <a href="booking.html?service=${service.id}" class="btn btn-secondary">Book Now</a>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    container.innerHTML = pricingHTML;
}