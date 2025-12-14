import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Uygulamanın çalıştığı port (Vite kullanıyorsan 5173 olabilir)
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});