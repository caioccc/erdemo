const path = require("path");

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
    mode: "development",
    entry: {
        erdemo: "./js/erdemo.js",
        simple: "./js/simple.js",
        react: "./js/react.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "www/dist")
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.less$/,
                use: extractLess.extract({
                    use: [
                        {loader: "css-loader"},
                        {loader: "less-loader"}
                    ],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'file-loader', 
                    options: {
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg|gif|png)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [extractLess]
};
