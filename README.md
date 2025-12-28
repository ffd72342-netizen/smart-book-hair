# Smart Booking System

A full-stack smart booking platform for barbershops and beauty salons with AI-powered recommendations.

## Features

- **Multi-page Frontend**: Home, Services, Stylists, Booking, Pricing, AI Stylist, Contact
- **REST API Backend**: Node.js/Express with proper MVC structure
- **AI Recommendations**: Simulated AI service for personalized suggestions
- **Real-time Booking**: Complete booking flow with availability checking
- **Responsive Design**: Mobile-first approach with modern CSS
- **Data Persistence**: In-memory storage (easily replaceable with database)

## Tech Stack

### Frontend
- HTML5 (Semantic markup)
- CSS3 (Grid, Flexbox, CSS Variables, Animations)
- Vanilla JavaScript (ES Modules, async/await)

### Backend
- Node.js
- Express.js
- REST API architecture
- Service layer pattern
- In-memory data storage

## Project Structure

```
/
├── frontend/
│   ├── index.html                    # Home page
│   ├── pages/                        # Sub-pages
│   │   ├── services.html
│   │   ├── stylists.html
│   │   ├── booking.html
│   │   ├── pricing.html
│   │   ├── ai-stylist.html
│   │   └── contact.html
│   ├── styles/                       # CSS files
│   │   ├── main.css                  # Global styles
│   │   ├── services.css
│   │   ├── stylists.css
│   │   ├── booking.css
│   │   ├── pricing.css
│   │   ├── ai-stylist.css
│   │   └── contact.css
│   ├── scripts/                      # JavaScript modules
│   │   ├── main.js                   # Common utilities
│   │   ├── config.js                 # API configuration
│   │   ├── services.js
│   │   ├── stylists.js
│   │   ├── booking.js
│   │   ├── pricing.js
│   │   ├── ai-stylist.js
│   │   └── contact.js
│   └── components/                   # Reusable components (future)
├── backend/
│   ├── server.js                     # Express server
│   ├── routes/                       # API routes
│   │   ├── services.js
│   │   ├── stylists.js
│   │   ├── availability.js
│   │   ├── bookings.js
│   │   └── ai.js
│   ├── controllers/                  # Request handlers (future)
│   ├── services/                     # Business logic
│   │   ├── availabilityService.js
│   │   ├── bookingService.js
│   │   └── aiService.js
│   └── data/                         # Data models
│       ├── services.js
│       ├── stylists.js
│       └── bookings.js
├── package.json                      # Dependencies
└── README.md
```

## API Endpoints

- `GET /api/services` - Get all services
- `GET /api/stylists` - Get all stylists
- `GET /api/availability?stylistId=X&date=Y` - Get availability
- `POST /api/bookings` - Create booking
- `POST /api/ai/recommendation` - Get AI recommendation
- `GET /api/health` - Health check

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

The server will serve the frontend files and provide the API endpoints.

## Adding Images

Add the following images to `frontend/assets/`:
- `salon-hero.jpg` (1200x600px hero image)
- `stylist1.jpg`, `stylist2.jpg`, `stylist3.jpg`, `stylist4.jpg` (300x300px stylist photos)

For development, you can use placeholder images from https://picsum.photos/

## Booking Flow

1. User selects service category
2. User chooses specific service
3. User selects stylist (filtered by service compatibility)
4. User picks date and time (with availability checking)
5. User enters contact details
6. Booking is validated and stored via API
7. Confirmation displayed

## AI Stylist Feature

The AI stylist provides personalized recommendations based on:
- Hair type (straight, wavy, curly, coily)
- User preferences (color, cut, beard, etc.)
- Budget constraints
- Special occasions

Recommendations include service, stylist, and reasoning.

## Development Notes

- **Separation of Concerns**: Frontend fetches data via API, no business logic duplication
- **Error Handling**: Proper error states and user feedback
- **Performance**: Efficient CSS, minimal JavaScript bundle
- **Scalability**: Service layer ready for database integration
- **Security**: Input validation, CORS enabled

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication
- Email notifications
- Payment processing
- Real AI integration (OpenAI API)
- Admin dashboard
- Mobile app