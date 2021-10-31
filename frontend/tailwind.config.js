const plugin = require('tailwindcss/plugin');

module.exports = {
    mode: 'jit',
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
            './src/**/*.{js,jsx,ts,tsx}'
        ]
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            borderRadius: {
                inherit: 'inherit'
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        plugin(function({ addUtilities }) {
            const newUtilities = {
                '.transition-none': { transition: 'none' },
                '.transition-fast': { transition: '.18s cubic-bezier(.16,.16,.40,.82)' },
                '.transition-main': { transition: '.3s cubic-bezier(.16,.16,.40,.82)' },
                '.transition-medium': { transition: '.6s cubic-bezier(.16,.16,.40,.82)' }
            };

            addUtilities(newUtilities, ['responsive', 'hover']);
        })
    ]
};
