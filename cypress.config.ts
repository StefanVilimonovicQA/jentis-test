import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    experimentalRunAllSpecs: true,
    testIsolation: false,
    defaultCommandTimeout: 20000,
    videoCompression: false,
    chromeWebSecurity: false,
    pageLoadTimeout: 200000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    retries: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here

      require('cypress-mochawesome-reporter/plugin')(on);

    },
  },
});
