const { defineConfig } = require('cypress');
const { allureCypress } = require('allure-cypress/reporter');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',

    setupNodeEvents(on, config) {
      allureCypress(on, config, {
        resultsDir: 'allure-results'
      });

      return config;
    }
  },

  expose: {
    apiUrl: 'https://serverest.dev'
  },

  viewportWidth: 1366,
  viewportHeight: 768,
  defaultCommandTimeout: 10000
});