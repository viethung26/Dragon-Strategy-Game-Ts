const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const APP_DIR = path.resolve(__dirname, "./src/")

module.exports = {
    entry: './src/main.ts',
    devtool: 'inlines-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'babel-loader',
                include: APP_DIR,
                exclude: /node_modules/   ,
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                include: APP_DIR,
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            assets: path.resolve(__dirname, './assets'),
            src: path.resolve(__dirname, './src'),
            units: path.resolve(__dirname, './src/units'),
            framework: path.resolve(__dirname, './src/framework'),
            entities: path.resolve(__dirname, './src/entities'),
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: "/js/"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        hotOnly: false,
        open: 'Google Chrome',
        proxy: {
            '/test': 'http://localhost:8080'
        }
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()]
};
            
