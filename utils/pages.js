const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
      title,
      filename: `${title.toLowerCase()}/${title.toLowerCase()}.html`,
      template: `./src/pages/${title.toLowerCase()}/index.html`,
      chunks: [title.toLowerCase()],
    });
}
  
exports.populateHtmlPlugins = (pagesArray) => {
    res = [];
    pagesArray.forEach(page => {
      res.push(generateHtmlPlugin(page));
    })
    return res;
}

exports.populateEntryPoints = (pointsArray) => {
    res = {};
    pointsArray.forEach(point => {
        res[point] = path.resolve(__dirname, `../src/pages/${point}/index.js`);
    });
    return res;
}