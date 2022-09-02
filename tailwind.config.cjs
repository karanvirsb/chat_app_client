/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
        colors: {
            groupBar: "#242933",
        },
    },
    plugins: [require("daisyui")],
};
