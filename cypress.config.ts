import { defineConfig } from "cypress";

export default defineConfig({
  fixturesFolder: "cypress/fixtures",
  supportFolder: "cypress/support",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  projectId: "2wvk9b",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
