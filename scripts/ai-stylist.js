// AI Stylist page JavaScript
import { apiCall, showLoading, showError, formatCurrency, formatDuration } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('ai-form').addEventListener('submit', handleAIRecommendation);
});

async function handleAIRecommendation(e) {
    e.preventDefault();

    const hairType = document.getElementById('hair-type').value;
    const preferences = document.getElementById('preferences').value;
    const budget = document.getElementById('budget').value;
    const occasion = document.getElementById('occasion').value;

    const recommendationDisplay = document.getElementById('recommendation-display');
    showLoading(recommendationDisplay);

    try {
        const response = await apiCall('/ai/recommendation', {
            method: 'POST',
            body: JSON.stringify({
                hairType,
                preferences: preferences.split(',').map(p => p.trim()),
                budget: budget || null,
                occasion: occasion || null
            })
        });

        if (response.success) {
            renderRecommendation(response.data);
        } else {
            showError(recommendationDisplay, 'Failed to get recommendation');
        }
    } catch (error) {
        showError(recommendationDisplay, 'Unable to connect to AI service. Please try again later.');
    }
}

function renderRecommendation(recommendation) {
    const container = document.getElementById('recommendation-display');

    const recommendationHTML = `
        <div class="recommendation-card">
            <h3>AI Recommendation</h3>
            <div class="confidence-score">
                Confidence: ${recommendation.confidence}%
            </div>
            <div class="recommendation-content">
                <div class="recommended-service">
                    <h4>Recommended Service</h4>
                    <div class="service-details">
                        <h5>${recommendation.service.name}</h5>
                        <p>${recommendation.service.description}</p>
                        <div class="service-meta">
                            <span>${formatCurrency(recommendation.service.price)}</span>
                            <span>${formatDuration(recommendation.service.duration)}</span>
                        </div>
                    </div>
                </div>
                <div class="recommended-stylist">
                    <h4>Recommended Stylist</h4>
                    <div class="stylist-details">
                        <h5>${recommendation.stylist.name}</h5>
                        <div class="stylist-rating">
                            ${'★'.repeat(Math.floor(recommendation.stylist.rating))}${'☆'.repeat(5 - Math.floor(recommendation.stylist.rating))}
                            <span>(${recommendation.stylist.rating})</span>
                        </div>
                        <p>${recommendation.stylist.bio}</p>
                        <div class="stylist-specialties">
                            ${recommendation.stylist.specialties.map(specialty => `<span class="specialty-tag">${specialty}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="recommendation-reasoning">
                    <h4>Why This Recommendation?</h4>
                    <p>${recommendation.reasoning}</p>
                </div>
                <div class="booking-action">
                    <a href="booking.html?service=${recommendation.service.id}&stylist=${recommendation.stylist.id}" class="btn btn-primary">
                        Book This Service
                    </a>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = recommendationHTML;
}