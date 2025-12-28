// Contact page JavaScript
import { apiCall, showLoading, showError } from './main.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
});

async function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    try {
        const response = await apiCall('/contact', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email,
                subject,
                message
            })
        });

        if (response.success) {
            alert('Thank you for your message! We\'ll get back to you within 24 hours.');
            e.target.reset();
        } else {
            alert('Failed to send message. Please try again.');
        }
    } catch (error) {
        alert('Failed to send message. Please check your connection and try again.');
    } finally {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
}