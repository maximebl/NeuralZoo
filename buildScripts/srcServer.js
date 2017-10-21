import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.babel';

const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo:true,
    publicPath: config.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./src/index.html'));
});

app.listen(3000, function (err) {
    err ? console.error(err) : open('http://localhost:3000');
});