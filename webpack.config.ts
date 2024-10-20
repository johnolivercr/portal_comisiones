import { DotenvRunPlugin } from '@dotenv-run/webpack';
import TerserPlugin from 'terser-webpack-plugin';
import WebpackObfuscator from 'webpack-obfuscator';
import webpack from 'webpack';

export default (config: webpack.Configuration) => {

    config.plugins?.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            'ngDevMode': JSON.stringify(false)  // Deshabilitar ngDevMode
        })
    );

    config.plugins?.push(
        new DotenvRunPlugin({
            root: '../..',
            cwd: process.cwd(),
            prefix: /^NG_APP|NGX/,
            files: ['.env']
        })
    );

    // Configurar el plugin Terser
    config.optimization = {
        ...config.optimization,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true, // Elimina los console.log
                        drop_debugger: true, // Elimina los debugger
                        pure_funcs: ['console.info', 'console.debug', 'console.warn'], // Elimina funciones específicas de depuración
                        passes: 3, // Realiza múltiples pases para mejorar la compresión
                        dead_code: true, // Elimina código no alcanzado
                        keep_fargs: false, // Elimina argumentos de funciones no utilizados
                        pure_getters: true, // Simplifica las llamadas a getters si no tienen efectos secundarios
                        // unsafe: true, // Permite optimizaciones "inseguras" que pueden cambiar el comportamiento del código
                        // unsafe_comps: true, // Permite la compresión de comparaciones inseguras
                        // unsafe_math: true, // Permite optimizaciones matemáticas inseguras
                        // unsafe_proto: true, // Permite la compresión de llamadas a __proto__
                    },
                    mangle: true, // Manglea nombres de variables
                    output: {
                        comments: false, // Elimina comentarios del código
                    },
                },
                extractComments: false, // No extraer comentarios a archivos separados
            })
        ]
    };

    // Agregar el plugin de ofuscación con configuración corregida
    config.plugins?.push(
        new WebpackObfuscator({
            // rotateStringArray: true,
            // stringArray: true,
            // stringArrayEncoding: ['base64'], // Asegúrate de que sea un array con elementos únicos
            // stringArrayThreshold: 0.75,
            // numbersToExpressions: false,
            // simplify: true,
            // identifierNamesGenerator: 'hexadecimal',
            debugProtection: true
        }, [])
    );

    return config;
};
