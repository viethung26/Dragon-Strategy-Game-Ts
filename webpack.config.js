const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: './src/main.ts',
    devtool: 'inlines-source-map',
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'babel-loader',
                exclude: /node_modules/   ,
            },
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
          
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/js'),
        publicPath: "/js/"
    },
    devServer: {
        contentBase: path.join(__dirname, "public/"),
        port: 3000,
        hotOnly: false
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new CleanWebpackPlugin()]
};
            
