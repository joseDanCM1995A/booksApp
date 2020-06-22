const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// verificando si se encuentra en producción
const devMode = process.env.NODE_ENV !== 'production'; // si es distinto de producción


module.exports = {
    entry: './frontEnd/app.js', // indicando en el archivo de entrada a transformar
    output: {
        path: path.join(__dirname, 'backEnd/public'), // indicando la salida del archivo ya transformado por webpack
        filename: 'js/bundle.js' // nombre con el que saldrá el archivo
    },
    mode: 'production', // indicando a webpack el entorno
    module: {
        rules: [{ // indicando la regal del css
            test: /\.css/,
            use: [
                devMode ? 'style-loader' : miniCssExtractPlugin.loader, // si esta en desarrolloo carga los stilos en js sino usa su propio archivo de css
                'css-loader'
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'frontEnd/index.html', // indicando la entrada que será transformado
            minify: { // comprimiendo todo el archivo
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }
        }),
        new miniCssExtractPlugin({ // indicando la salida del css tranformado
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map' // ir viend los errores por linea en desarrollo
};