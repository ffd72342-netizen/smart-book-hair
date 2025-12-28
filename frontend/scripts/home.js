// Home page JavaScript - Testimonials carousel and live stats
import { apiCall } from '../scripts/main.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeHomePage();
});

async function initializeHomePage() {
    // Initialize testimonials carousel
    initializeTestimonials();

    // Load live stats
    loadLiveStats();

    // Load recent bookings
    loadRecentBookings();

    // Register service worker for PWA
    registerServiceWorker();
}

function initializeTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    let currentSlide = 0;

    function showSlide(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
    });

    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
    }, 5000);
}

async function loadLiveStats() {
    try {
        const response = await apiCall('/bookings');
        if (response.success) {
            const bookings = response.data;
            const clientsServed = bookings.length + 150; // Base count + actual bookings
            document.getElementById('clients-served').textContent = clientsServed + '+';
        }
    } catch (error) {
        console.log('Could not load live stats:', error);
    }
}

async function loadRecentBookings() {
    const container = document.getElementById('recent-bookings');

    // Show skeleton loading
    container.innerHTML = `
        <div class="booking-card">
            <div class="skeleton skeleton-text" style="width: 60%;"></div>
            <div class="skeleton skeleton-text" style="width: 80%;"></div>
            <div class="skeleton skeleton-text" style="width: 40%;"></div>
        </div>
        <div class="booking-card">
            <div class="skeleton skeleton-text" style="width: 70%;"></div>
            <div class="skeleton skeleton-text" style="width: 50%;"></div>
            <div class="skeleton skeleton-text" style="width: 60%;"></div>
        </div>
        <div class="booking-card">
            <div class="skeleton skeleton-text" style="width: 55%;"></div>
            <div class="skeleton skeleton-text" style="width: 75%;"></div>
            <div class="skeleton skeleton-text" style="width: 45%;"></div>
        </div>
    `;

    try {
        const response = await apiCall('/bookings');
        if (response.success) {
            const recentBookings = response.data.slice(-3).reverse(); // Get last 3 bookings

            if (recentBookings.length > 0) {
                const bookingsHTML = recentBookings.map(booking => `
                    <div class="booking-card">
                        <div class="booking-service">${booking.service}</div>
                        <div class="booking-details">
                            with ${booking.stylist} on ${new Date(booking.date).toLocaleDateString()}
                        </div>
                        <span class="booking-status status-${booking.status.toLowerCase()}">${booking.status}</span>
                    </div>
                `).join('');
                container.innerHTML = bookingsHTML;
            } else {
                container.innerHTML = '<p>No recent bookings yet. Be the first to book!</p>';
            }
        }
    } catch (error) {
        container.innerHTML = '<p>Could not load recent bookings. Please try again later.</p>';
    }
}

function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
}