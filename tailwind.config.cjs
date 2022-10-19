/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: "jit",
    darkMode: "media",
    purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
    theme: {
        extend: {
            colors: {
                "groupBar-bg": "#242933",
                "groupInfo-bg": "hsl(220, 18%, 15%)",
                "chat-bg": "hsl(220, 18%, 25%)",
            },
        },
    },
    plugins: [require("daisyui"), require("preline/plugin")],
};
