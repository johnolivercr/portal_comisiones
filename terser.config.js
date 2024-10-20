const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
    plugins: [new Dotenv()],
    mode: 'production',// enables various webpack optimisations
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            minify: TerserPlugin.esbuildMinify,
            parallel: true,
            terserOptions: {
                mangle: {
                    // Configuración avanzada de mangle para renombrar variables y funciones
                    toplevel: true, // Ofusca también las variables y funciones del nivel superior
                    properties: {
                        regex: /./, // Ofusca las propiedades que comienzan con un guion bajo
                    },
                }, //Habilita la alteración del nombre de la variable 
                compress: {
                    drop_console: true, // Elimina los console.log
                    drop_debugger: true, // Elimina los debugger
                    pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Elimina funciones específicas de depuración
                    passes: 3, // Realiza múltiples pases para mejorar la compresión
                    dead_code: true, // Elimina código no alcanzado
                    keep_fargs: false, // Elimina argumentos de funciones no utilizados
                    pure_getters: true, // Simplifica las llamadas a getters si no tienen efectos secundarios
                    unsafe: true, // Permite optimizaciones "inseguras" que pueden cambiar el comportamiento del código
                    unsafe_comps: true, // Permite la compresión de comparaciones inseguras
                    unsafe_math: true, // Permite optimizaciones matemáticas inseguras
                    unsafe_proto: true, // Permite la compresión de llamadas a __proto__
                },
                output: {
                    comments: false, // Elimina comentarios
                },
                format: {
                    comments: false, // Elimina comentarios adicionales en la salida
                },
            },
            extractComments: false, // No extrae comentarios a un archivo separado
        })],
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Aplica a archivos .js
                exclude: /node_modules/, // Excluye node_modules
                use: {
                    loader: 'babel-loader', // Usa babel-loader para transpilar el código
                    options: {
                        presets: ['@babel/preset-env'], // Configura presets de Babel
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'], // Resuelve archivos .js sin necesidad de especificar la extensión
    }
};