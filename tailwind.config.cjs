/** @type {import('tailwindcss').Config} */

module.exports = {
    mode: "jit",
    darkMode: "media",
    purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
    content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
    theme: {
        screens: {
            sm: "460px",
            md: "720px",
            lg: "1196px",
            xl: "1440px",
            xxl: "1920px",
        },
        extend: {
            colors: {
                "groupBar-bg": "#242933",
                "groupInfo-bg": "hsl(220, 18%, 15%)",
                "chat-bg": "hsl(220, 18%, 25%)",
                "btn-mutations": "hsla(360, 62%, 59%, 100%)",
                "btn-mutations-text": "hsla(218, 18%, 12%, 100%)",
                "btn-mutations-hover": "hsla(360, 62%, 55%, 100%)",
                "btn-primary": "hsla(219, 18%, 50%, 100%)",
                "btn-primary-hover": "hsla(219, 18%, 35%, 100%)",
                "btn-cta": "hsla(219, 18%, 45%, 100%)",
                "btn-cta-hover": "hsla(219, 18%, 40%, 100%)",
                "accent-color": "hsla(56, 100%, 65%, 100%)",
            },
        },
    },
    plugins: [require("daisyui")],
};
