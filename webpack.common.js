import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
    entry: { index: "./src/index.js" },
    output: {
        path: path.resolve(import.meta.dirname, "dist"),
        filename: "[name].bundle.js",
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html",
            chunks: ["index"],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
};
