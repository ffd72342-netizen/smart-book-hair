// Booking page JavaScript
import { apiCall, showLoading, showError, formatCurrency, formatDuration } from './main.js';

let services = [];
let stylists = [];
let selectedService = null;
let selectedStylist = null;
let currentStep = 1;

document.addEventListener('DOMContentLoaded', () => {
    initializeBooking();
});

async function initializeBooking() {
    try {
        // Load services and stylists
        const [servicesResponse, stylistsResponse] = await Promise.all([
            apiCall('/services'),
            apiCall('/stylists')
        ]);

        if (servicesResponse.success && stylistsResponse.success) {
            services = servicesResponse.data;
            stylists = stylistsResponse.data;
            renderServiceSelection();
            renderStylistSelection();
            setupEventListeners();
            updateSummary();
        } else {
            showError(document.querySelector('.booking-form'), 'Failed to load booking data');
        }
    } catch (error) {
        showError(document.querySelector('.booking-form'), 'Unable to connect to server. Please try again later.');
    }
}

function renderServiceSelection() {
    const container = document.getElementById('service-selection');
    const servicesHTML = services.map(service => `
        <div class="service-option ${selectedService?.id === service.id ? 'selected' : ''}" data-service-id="${service.id}">
            <div class="service-info">
                <h4>${service.name}</h4>
                <p>${service.description}</p>
                <div class="service-meta">
                    <span>${formatCurrency(service.price)}</span>
                    <span>${formatDuration(service.duration)}</span>
                </div>
            </div>
        </div>
    `).join('');
    container.innerHTML = servicesHTML;
}

function renderStylistSelection() {
    const container = document.getElementById('stylist-selection');
    const availableStylists = selectedService
        ? stylists.filter(stylist => stylist.specialties.includes(selectedService.category))
        : stylists;

    const stylistsHTML = availableStylists.map(stylist => `
        <div class="stylist-option ${selectedStylist?.id === stylist.id ? 'selected' : ''}" data-stylist-id="${stylist.id}">
            <div class="stylist-info">
                <h4>${stylist.name}</h4>
                <div class="stylist-rating">
                    ${'★'.repeat(Math.floor(stylist.rating))}${'☆'.repeat(5 - Math.floor(stylist.rating))}
                    <span>(${stylist.rating})</span>
                </div>
                <p>${stylist.bio}</p>
            </div>
        </div>
    `).join('');
    container.innerHTML = stylistsHTML;
}

function setupEventListeners() {
    // Service selection
    document.getElementById('service-selection').addEventListener('click', (e) => {
        const option = e.target.closest('.service-option');
        if (option) {
            const serviceId = parseInt(option.dataset.serviceId);
            selectedService = services.find(s => s.id === serviceId);
            renderServiceSelection();
            renderStylistSelection();
            updateSummary();
        }
    });

    // Stylist selection
    document.getElementById('stylist-selection').addEventListener('click', (e) => {
        const option = e.target.closest('.stylist-option');
        if (option) {
            const stylistId = parseInt(option.dataset.stylistId);
            selectedStylist = stylists.find(s => s.id === stylistId);
            renderStylistSelection();
            updateSummary();
        }
    });

    // Navigation buttons
    document.getElementById('next-to-step-2').addEventListener('click', () => {
        if (selectedService) {
            showStep(2);
        }
    });

    document.getElementById('next-to-step-3').addEventListener('click', () => {
        if (selectedStylist) {
            showStep(3);
            loadAvailability();
        }
    });

    document.getElementById('next-to-step-4').addEventListener('click', () => {
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        if (date && time) {
            showStep(4);
        }
    });

    document.getElementById('back-to-step-1').addEventListener('click', () => showStep(1));
    document.getElementById('back-to-step-2').addEventListener('click', () => showStep(2));
    document.getElementById('back-to-step-3').addEventListener('click', () => showStep(3));

    // Form submission
    document.getElementById('booking-form').addEventListener('submit', handleBookingSubmit);

    // Date change
    document.getElementById('booking-date').addEventListener('change', loadAvailability);
}

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    currentStep = step;
}

async function loadAvailability() {
    const date = document.getElementById('booking-date').value;
    if (!date || !selectedStylist) return;

    try {
        const response = await apiCall(`/availability?stylistId=${selectedStylist.id}&date=${date}`);
        if (response.success) {
            renderTimeSlots(response.data.availableSlots);
        }
    } catch (error) {
        console.error('Failed to load availability:', error);
    }
}

function renderTimeSlots(slots) {
    const timeSelect = document.getElementById('booking-time');
    timeSelect.innerHTML = '<option value="">Select time</option>';
    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
    });
}

function updateSummary() {
    const summaryContent = document.getElementById('summary-content');
    let summaryHTML = '<p>No selections made yet.</p>';

    if (selectedService || selectedStylist) {
        summaryHTML = `
            ${selectedService ? `<p><strong>Service:</strong> ${selectedService.name} (${formatCurrency(selectedService.price)})</p>` : ''}
            ${selectedStylist ? `<p><strong>Stylist:</strong> ${selectedStylist.name}</p>` : ''}
        `;
    }

    summaryContent.innerHTML = summaryHTML;
}

async function handleBookingSubmit(e) {
    e.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const customerEmail = document.getElementById('customer-email').value;
    const date = document.getElementById('booking-date').value;
    const time = document.getElementById('booking-time').value;

    try {
        const response = await apiCall('/bookings', {
            method: 'POST',
            body: JSON.stringify({
                customerName,
                customerEmail,
                serviceId: selectedService.id,
                stylistId: selectedStylist.id,
                date,
                time
            })
        });

        if (response.success) {
            alert('Booking confirmed! Check your email for confirmation details.');
            // Reset form
            window.location.reload();
        } else {
            alert('Booking failed. Please try again.');
        }
    } catch (error) {
        alert('Failed to submit booking. Please try again.');
    }
}