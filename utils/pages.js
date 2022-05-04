const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const removeLastWord = (string) => {
  let ind = string.lastIndexOf("/");
  if (ind !== -1) {
    return string.slice(0, ind);
  }  
  return string;
}

const generateHtmlPlugin = (title) => {
    return new HtmlWebpackPlugin({
      title,
      filename: `${title.toLowerCase()}.html`,
      template: `./src/pages/${removeLastWord(title).toLowerCase()}/index.html`,
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
        res[point] = path.resolve(__dirname, `../src/pages/${removeLastWord(point)}/index.js`);
    });
    return res;
}