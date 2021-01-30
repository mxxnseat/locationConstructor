const path = require("path");
const miniCss = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "./app"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.s[a|c]ss$/,
                use: [miniCss.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new miniCss({ filename: "style.css" }),
    ],
    devServer: {
        contentBase: "./app",
        port: 3002,
        hot: true,
    }
}