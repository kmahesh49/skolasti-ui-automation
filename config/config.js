// Environment variables are loaded in playwright.config.js
// This keeps passwords and sensitive data secure

module.exports = {
  // Timeout settings
  timeout: {
    default: 30000,      // 30 seconds for most actions
    navigation: 60000,   // 60 seconds for page loads
    apiCall: 15000       // 15 seconds for API responses
  },

  // Base URLs for different user types
  urls: {
    base: process.env.BASE_URL,           // Marketing page URL
    coach: process.env.COACH_URL,         // Coach portal URL
    learner: process.env.LEARNER_URL      // Learner portal URL
  },

  // Tenant information
  tenant: {
    name: process.env.TENANT_NAME,
    domain: process.env.TENANT_DOMAIN
  },

  // User credentials (loaded from .env file)
  users: {
    coach: {
      email: process.env.COACH_EMAIL,
      password: process.env.COACH_PASSWORD
    },
    learner1: {
      email: process.env.LEARNER1_EMAIL,
      password: process.env.LEARNER1_PASSWORD,
      tenantId: process.env.LEARNER1_TENANT_ID
    },
    learner2: {
      email: process.env.LEARNER2_EMAIL,
      password: process.env.LEARNER2_PASSWORD
    }
  }
};