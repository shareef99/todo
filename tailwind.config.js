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
            "9/10": "90%",
            95: "95%",
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
            height: {
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
        colors: {
            blue: {
                DEFAULT: "rgba(96, 165, 250, 1)",
                primary: "rgba(36, 165, 250, 1)",
                light: "rgba(96, 165, 280, 1)",
            },
            red: {
                DEFAULT: "rgba(289, 68, 68, 1)",
                dark: "rgba(239, 68, 38, 1)",
                300: "#FCA5A5",
                900: "#7F1D1D",
            },
            white: {
                DEFAULT: "#F1F5F9",
                light: "#FAFAFA",
            },
            black: {
                DEFAULT: "#303030",
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
