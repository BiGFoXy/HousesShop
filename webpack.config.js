const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const pagesModule = require("./utils/pages.js")
const to_pages = ["Index/index"];

const pages = pagesModule.populateHtmlPlugins(to_pages);
const points = pagesModule.populateEntryPoints(to_pages.map(element => {
    return element.toLowerCase();
}))

module.exports = {
    mode: 'development',
    entry: points,
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'src'),
        },
        port: 5500,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: {
            rewrites: [
                {from: /./, to:'/index/index.html'}
            ]
        },
    },
    module: {
        rules: [
            {
                test:/\.s[ac]ss$/i,
                use: [
                    process.env.NODE_ENV !== "production"
                    ? "style-loader"
                    : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'img/[name][ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator : {
                    filename : 'fonts/[name][ext]',
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

    ].concat(pages),
}