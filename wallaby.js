var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = require('./webpack.config.babel');

// removing babel-loader, we will use babel compiler instead, it's more performant
webpackConfig.module.rules = webpackConfig.module.rules.filter(function(l){
    return l.use !== 'babel-loader';
});

delete webpackConfig.devtool;

var wallabyPostprocessor = wallabyWebpack(webpackConfig);

module.exports = function (wallaby) {
    return {
        files: [
            {pattern: 'src/**/*.js', load: false}
        ],

        tests: [
            {pattern:'spec/**/*Spec.js', load: false}
        ],

        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },

        postprocessor: wallabyPostprocessor,

        setup: function () {
            // required to trigger test loading
            window.__moduleBundler.loadTests();
        }
    };
};