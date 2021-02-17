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
            300: "300px",
        },
        minWidth: {
            "1/2": "50%",
            300: "300px",
        },
        extend: {
            width: {
                "9/10": "90%",
            },
        },
        screens: {
            sm: "500px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
