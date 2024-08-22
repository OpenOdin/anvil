module.exports = {
    content: [
        "./src/**/*.{html,js,riot,css}",
    ],

    theme: {
        extend: {
            fontFamily: {
                "quattrocento": ["Quattrocento", "sans-serif"] 
            },
            colors: {
                odingreen: {
                    600: "#4aef85",
                },
                odingray: {
                    600: "#697a82",
                },
            }
        },
    },

    plugins: [
    ],
}
