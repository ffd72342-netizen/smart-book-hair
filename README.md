# Smart Booking System

A frontend-only smart booking platform for barbershops and beauty salons with AI-powered recommendations. **Now runs entirely on the frontend without any backend server!**

## Features

- **Multi-page Frontend**: Home, Services, Stylists, Booking, Pricing, AI Stylist, Contact
- **Mock API Backend**: JavaScript functions simulating all backend operations
- **AI Recommendations**: Simulated AI service for personalized suggestions
- **Real-time Booking**: Complete booking flow with availability checking
- **Responsive Design**: Mobile-first approach with modern CSS
- **GitHub Pages Ready**: Works without any backend server
- **PWA Support**: Progressive Web App with service worker and manifest

## Tech Stack

### Frontend
- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, CSS Variables, Animations)
- Vanilla JavaScript (ES Modules, async/await)
- Mock API (JavaScript functions replacing backend calls)

## How It Works

This application now runs entirely in the browser using JavaScript functions that simulate API responses:

- `getServices()` - Returns array of services
- `getStylists()` - Returns array of stylists with availability
- `bookAppointment(data)` - Logs booking and returns success object
- `getAIRecommendation(input)` - Returns simulated AI suggestions
- All data is stored in memory and persists during the session

## Running the Application

### Option 1: GitHub Pages (Recommended)
1. Upload all files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via `https://yourusername.github.io/repository-name/`

### Option 2: Local Development
```bash
# Using Python (recommended for simple testing)
python -m http.server 8080
# Then open http://localhost:8080/index.html

# Or using Node.js
npx serve .
# Then open the provided URL
```

### Option 3: Any Static Server
Use any static file server (Apache, Nginx, etc.) to serve the files.

## Project Structure

```
/
├── index.html                        # Home page
├── pages/                            # Sub-pages
│   ├── services.html
│   ├── stylists.html
│   ├── booking.html
│   ├── pricing.html
│   ├── ai-stylist.html
│   └── contact.html
├── styles/                           # CSS files
│   ├── main.css                      # Global styles
│   ├── services.css
│   ├── stylists.css
│   ├── booking.css
│   ├── pricing.css
│   ├── ai-stylist.css
│   └── contact.css
├── scripts/                          # JavaScript modules
│   ├── main.js                       # Common utilities & mock API calls
│   ├── mock-api.js                   # Mock API functions
│   ├── services.js
│   ├── stylists.js
│   ├── booking.js
│   ├── pricing.js
│   ├── ai-stylist.js
│   ├── contact.js
│   └── home.js
├── assets/                           # Static assets (future)
├── manifest.json                     # PWA manifest
├── sw.js                             # Service worker
├── package.json                      # Dependencies
└── README.md
```

## Mock API Functions

The application uses JavaScript functions instead of HTTP requests:

- `getServices()` - Returns array of services
- `getStylists()` - Returns array of stylists with availability
- `getAvailability(stylistId, date)` - Returns available time slots
- `bookAppointment(bookingData)` - Creates booking and returns success
- `getAIRecommendation(input)` - Returns AI-powered suggestions
- `sendContactMessage(messageData)` - Handles contact form submissions

All functions include simulated network delays and proper error handling.

## Testing the Application

1. **Start a local server:**
   ```bash
   python -m http.server 8080
   ```

2. **Open in browser:**
   Navigate to `http://localhost:8080/index.html`

3. **Test all features:**
   - Browse services and stylists
   - Make a booking (check console for logged bookings)
   - Try AI recommendations
   - Send contact messages
   - Test PWA installation

## Deploying to GitHub Pages

1. Create a new GitHub repository
2. Upload all project files
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose `main`
5. The site will be available at `https://yourusername.github.io/repository-name/`

## Booking Flow

1. User selects service category
2. User chooses specific service
3. User selects stylist (filtered by service compatibility)
4. User picks date and time (with availability checking)
5. User enters contact details
6. Booking is validated and stored in memory
7. Confirmation displayed (booking logged to console)

## AI Stylist Feature

The AI stylist provides personalized recommendations based on:
- Hair type and preferences
- Budget constraints
- Occasion requirements
- Service compatibility

## PWA Features

- Installable on mobile devices
- Offline functionality via service worker
- Fast loading with cached resources
- Native app-like experience

## Browser Support

Works in all modern browsers that support:
- ES6 Modules
- async/await
- CSS Grid and Flexbox
- Service Workers (optional for PWA)

## Contributing

Since this is now a frontend-only application, contributions can be made by:
- Improving the mock API functions
- Adding new features to the UI
- Enhancing the PWA capabilities
- Optimizing performance

## License

ISC License