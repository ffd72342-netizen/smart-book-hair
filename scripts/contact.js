// Contact page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', handleContactSubmit);
});

function handleContactSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // In a real application, this would send to a backend API
    // For now, we'll just show a success message
    alert(`Thank you for your message, ${name}! We'll get back to you soon.`);

    // Reset form
    e.target.reset();
}