const services = require('../data/services');
const stylists = require('../data/stylists');

// Simulated AI service for recommendations
class AIService {
    generateRecommendation(userInput) {
        const { hairType, preferences, budget, occasion } = userInput;

        // AI logic: Match services based on user input
        let recommendedServices = services.filter(service => {
            if (hairType === 'curly' && service.category === 'hair') return true;
            if (hairType === 'straight' && service.category === 'hair') return true;
            if (preferences.includes('beard') && service.category === 'beard') return true;
            if (preferences.includes('facial') && service.category === 'facial') return true;
            if (preferences.includes('nails') && service.category === 'nails') return true;
            if (preferences.includes('relaxation') && service.category === 'wellness') return true;
            return false;
        });

        // Filter by budget if provided
        if (budget) {
            recommendedServices = recommendedServices.filter(service => service.price <= budget);
        }

        // Select best service (simplified AI decision)
        const bestService = recommendedServices[0] || services[0];

        // Find suitable stylist
        const suitableStylists = stylists.filter(stylist =>
            stylist.specialties.includes(bestService.category)
        );

        const recommendedStylist = suitableStylists[0] || stylists[0];

        // Generate response
        const response = {
            service: bestService,
            stylist: recommendedStylist,
            reasoning: this.generateReasoning(userInput, bestService, recommendedStylist),
            confidence: Math.floor(Math.random() * 20) + 80 // 80-99%
        };

        return response;
    }

    generateReasoning(userInput, service, stylist) {
        const { hairType, preferences, budget, occasion } = userInput;

        let reasoning = `Based on your ${hairType} hair type and preference for ${preferences.join(', ')}, `;

        if (occasion) {
            reasoning += `perfect for a ${occasion} occasion, `;
        }

        reasoning += `I recommend the ${service.name} service with ${stylist.name}. `;

        if (budget && service.price <= budget) {
            reasoning += `This fits within your $${budget} budget. `;
        }

        reasoning += `${stylist.name} specializes in ${stylist.specialties.join(' and ')} with ${stylist.experience} years of experience.`;

        return reasoning;
    }
}

module.exports = new AIService();