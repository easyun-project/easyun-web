// eslint-disable-next-line no-undef
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                yellow: {
                    650: '#f5922f',
                    550: '#dd6b10',
                },
                indigo: {
                    500: '#3B82F6',
                    600: '#2563EB',
                },
                orange: {
                    400: '#FB923C',
                },
                emerald: {
                    500: '#10B981',
                    600: '#059669',
                    700: '#047857',
                },
            },
            minHeight: {
                20: '20vh',
            },
            minWidth: {
                30: '500px',
                0: '0',
                '1/2': '50%',
                '1/4': '25%',
                '3/4': '75%',
                full: '100%',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
