import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// Builds the admin React dashboard into assets/js/dashboard.js and
// assets/css/dashboard.css, matching the paths already registered
// in app/Admin/Dashboard.php (wp_enqueue_script / wp_enqueue_style).
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "assets",
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
            input: resolve(__dirname, "resources/react/main.jsx"),
            output: {
                format: "iife",
                entryFileNames: "js/dashboard.js",
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name && assetInfo.name.endsWith(".css")) {
                        return "css/dashboard.css";
                    }
                    return "js/[name][extname]";
                },
            },
        },
    },
});
