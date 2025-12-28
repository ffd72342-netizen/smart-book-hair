// Services page JavaScript
import { apiCall, showLoading, showError, formatCurrency, formatDuration } from '../scripts/main.js';

let allServices = [];
let comparingServices = [];

document.addEventListener('DOMContentLoaded', () => {
    loadServices();
    setupFilters();
    setupComparison();
});

async function loadServices() {
    const container = document.getElementById('services-container');
    showLoading(container);

    try {
        const response = await apiCall('/services');

        if (response.success) {
            allServices = response.data;
            renderServices(allServices);
        } else {
            showError(container, 'Failed to load services');
        }
    } catch (error) {
        showError(container, 'Unable to connect to server. Please try again later.');
    }
}

function renderServices(services) {
    const container = document.getElementById('services-container');

    const servicesHTML = services.map(service => `
        <div class="service-card ${comparingServices.some(s => s.id === service.id) ? 'comparing' : ''}" data-service-id="${service.id}">
            <input type="checkbox" class="compare-checkbox" data-service-id="${service.id}" ${comparingServices.some(s => s.id === service.id) ? 'checked' : ''}>
            <div class="service-header">
                <h3>${service.name}</h3>
                <div class="service-price">${formatCurrency(service.price)}</div>
            </div>
            <p class="service-description">${service.description}</p>
            <div class="service-details">
                <span class="service-duration">Duration: ${formatDuration(service.duration)}</span>
                <span class="service-category">${service.category}</span>
            </div>
            <a href="booking.html?service=${service.id}" class="btn btn-primary">Book Now</a>
        </div>
    `).join('');

    container.innerHTML = servicesHTML;
    setupComparisonCheckboxes();
}

function setupFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const resetBtn = document.getElementById('reset-filters');

    function applyFilters() {
        let filteredServices = [...allServices];

        // Category filter
        const category = categoryFilter.value;
        if (category) {
            filteredServices = filteredServices.filter(service => service.category === category);
        }

        // Price filter
        const maxPrice = priceFilter.value;
        if (maxPrice) {
            filteredServices = filteredServices.filter(service => service.price <= parseInt(maxPrice));
        }

        // Sort
        const sortBy = sortFilter.value;
        switch (sortBy) {
            case 'price-low':
                filteredServices.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredServices.sort((a, b) => b.price - a.price);
                break;
            case 'duration':
                filteredServices.sort((a, b) => a.duration - b.duration);
                break;
            case 'name':
            default:
                filteredServices.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        renderServices(filteredServices);
    }

    categoryFilter.addEventListener('change', applyFilters);
    priceFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);

    resetBtn.addEventListener('click', () => {
        categoryFilter.value = '';
        priceFilter.value = '';
        sortFilter.value = 'name';
        renderServices(allServices);
    });
}

function setupComparison() {
    const comparisonSection = document.getElementById('comparison-section');
    const comparisonGrid = document.getElementById('comparison-grid');
    const clearBtn = document.getElementById('clear-comparison');

    clearBtn.addEventListener('click', () => {
        comparingServices = [];
        renderServices(allServices);
        comparisonSection.style.display = 'none';
    });
}

function setupComparisonCheckboxes() {
    const checkboxes = document.querySelectorAll('.compare-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const serviceId = parseInt(e.target.dataset.serviceId);
            const service = allServices.find(s => s.id === serviceId);

            if (e.target.checked) {
                if (comparingServices.length < 3) {
                    comparingServices.push(service);
                } else {
                    e.target.checked = false;
                    alert('You can compare up to 3 services at a time');
                    return;
                }
            } else {
                comparingServices = comparingServices.filter(s => s.id !== serviceId);
            }

            renderServices(allServices);
            updateComparison();
        });
    });
}

function updateComparison() {
    const comparisonSection = document.getElementById('comparison-section');
    const comparisonGrid = document.getElementById('comparison-grid');

    if (comparingServices.length > 0) {
        comparisonSection.style.display = 'block';

        const comparisonHTML = comparingServices.map(service => `
            <div class="comparison-card">
                <h4>${service.name}</h4>
                <div class="comparison-details">
                    <p><strong>Price:</strong> ${formatCurrency(service.price)}</p>
                    <p><strong>Duration:</strong> ${formatDuration(service.duration)}</p>
                    <p><strong>Category:</strong> ${service.category}</p>
                    <p>${service.description}</p>
                </div>
            </div>
        `).join('');

        comparisonGrid.innerHTML = comparisonHTML;
    } else {
        comparisonSection.style.display = 'none';
    }
}