import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    include: ["src/**/__test__/**/*.test.{js,jsx,ts,tsx}"],
    setupFiles: ["./vitest.setup.js"],
  },
});
