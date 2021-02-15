module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "6rem",
            },
        },
        maxWidth: {
            "1/2": "50%",
        },
        minWidth: {
            "1/2": "50%",
        },
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
