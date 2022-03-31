const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const to_pages = ["Index", "Maximum_Negative"];

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
      title,
      filename: `${title.toLowerCase()}/${title.toLowerCase()}.html`,
      template: `./src/pages/${title.toLowerCase()}/index.html`,
      chunks: [title.toLowerCase()],
    });
}
  
const populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
      res.push(generateHtmlPlugin(page));
    })
    return res;
}

const populateEntryPoints = (pointsArray) => {
    res = {};
    pointsArray.forEach(point => {
        res[point] = path.resolve(__dirname, `src/pages/${point}/index.js`);
    });
    return res;
}

const pages = populateHtmlPlugins(to_pages);
const points = populateEntryPoints(to_pages.map(element => {
    return element.toLowerCase();
}))

module.exports = {
    mode: 'development',
    entry: points,
    output: { 
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]/[name].[contenthash].js',
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
            filename: "[name]/[name].css",
        }),

    ].concat(pages),
}