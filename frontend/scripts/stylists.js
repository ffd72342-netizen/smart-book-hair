// Stylists page JavaScript
import { apiCall, showLoading, showError } from '../scripts/main.js';

document.addEventListener('DOMContentLoaded', () => {
    loadStylists();
});

async function loadStylists() {
    const container = document.getElementById('stylists-container');
    showLoading(container);

    try {
        const response = await apiCall('/stylists');

        if (response.success) {
            renderStylists(response.data);
        } else {
            showError(container, 'Failed to load stylists');
        }
    } catch (error) {
        showError(container, 'Unable to connect to server. Please try again later.');
    }
}

function renderStylists(stylists) {
    const container = document.getElementById('stylists-container');

    const stylistsHTML = stylists.map(stylist => `
        <div class="stylist-card">
            <div class="stylist-image">
                <img src="${stylist.image}" alt="${stylist.name}" loading="lazy">
            </div>
            <div class="stylist-info">
                <h3>${stylist.name}</h3>
                <div class="stylist-rating">
                    ${'★'.repeat(Math.floor(stylist.rating))}${'☆'.repeat(5 - Math.floor(stylist.rating))}
                    <span>(${stylist.rating})</span>
                </div>
                <p class="stylist-bio">${stylist.bio}</p>
                <div class="stylist-specialties">
                    ${stylist.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                </div>
                <div class="stylist-experience">
                    ${stylist.experience} years experience
                </div>
                <a href="booking.html?stylist=${stylist.id}" class="btn btn-primary">Book with ${stylist.name.split(' ')[0]}</a>
            </div>
        </div>
    `).join('');

    container.innerHTML = stylistsHTML;
}