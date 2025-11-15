const { defineConfig } = require("cypress");
// Load environment variables before config is evaluated
const path = require('path');
const dotenv = require('dotenv')

// Load specific .env.<envName> if set, then fallback to .env
const envName = process.env.CYPRESS_ENV || process.env.NODE_ENV;
if (envName) {
  dotenv.config({ path: path.resolve(process.cwd(), `.env.${envName}`) });
}
else{
  dotenv.config();
}
module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/*/*.cy.js',
    setupNodeEvents(on, config) {
      
      // Initialize Allure writer to produce allure-results
      require('@shelex/cypress-allure-plugin/writer')(on, config);

      return config;
    },
    baseUrl: process.env.CYPRESS_UI_BASE_URL || 'https://v1.practicesoftwaretesting.com'
  },
  
  env:{
     allure: true,
     allureResultsPath: process.env.CYPRESS_ALLURE_RESULTS_DIR || 'reports/allure-results',
     apiBaseUrl: process.env.CYPRESS_API_BASE_URL,
  },
  defaultCommandTimeout: 8000,
  pageLoadTimeout: 60000,
  retries: { runMode: 2, openMode: 0 },
  video: false,
  screenshotsFolder: 'cypress/screenshots',
});
