const path = require('path');

module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require("tailwindcss"), require("autoprefixer")]
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('MkEditor', path.join(__dirname, "src/components"))
    }
}