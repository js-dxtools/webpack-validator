/* eslint-env node */
const packageJson = {
  name: 'formly',
  version: '0.0.0',
  contributors: [],
}

const here = require('path-here');
const _ = require('lodash');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

export default getConfig();

function getConfig() {
  let config = getCommonConfig();
  return _.merge(config, getTestConfig());
}

function getCommonConfig() {
  return {
    context: here(),
    entry: './configs.js',
    output: {
      libraryTarget: 'umd',
      library: 'ngFormly'
    },
    stats: {
      colors: true,
      reasons: true
    },
    resolve: {
      extensions: ['', '.js'],
      alias: {
        'angular-fix': here('src/angular-fix')
      }
    },
    eslint: {
      emitError: true,
      failOnError: true,
      failOnWarning: false,
      quiet: true
    },
    externals: {
      angular: 'angular',
      'api-check': {
        root: 'apiCheck',
        amd: 'api-check',
        commonjs2: 'api-check',
        commonjs: 'api-check'
      }
    }
  };
}

function getTestConfig() {
  const coverage = process.env.COVERAGE === 'true';
  const ci = process.env.CI === 'true';
  return {
    entry: './configs.js',
    module: {
      loaders: _.flatten([
        coverage ? getCoverageLoaders() : getJavaScriptLoader(),
        getHtmlLoader()
      ])
    },
    plugins: getCommonPlugins(),
    eslint: {
      emitError: ci,
      failOnError: ci
    }
  };

  function getCoverageLoaders() {
    return [
      {
        test: /\.test\.js$|\.mock\.js$/, // include only mock and test files
        loaders: ['ng-annotate', 'babel', 'eslint?configFile=./other/test.eslintrc'],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loaders: ['ng-annotate', 'isparta', 'eslint?configFile=./other/src.eslintrc'],
        exclude: /node_modules|\.test.js$|\.mock\.js$/ // exclude node_modules and test files
      }
    ];
  }
}


function getJavaScriptLoader() {
  return {test: /\.js$/, loaders: ['ng-annotate', 'babel', 'eslint?configFile=./other/src.eslintrc'], exclude: /node_modules/};
}

function getHtmlLoader() {
  return {test: /\.html$/, loaders: ['raw'], exclude: /node_modules/};
}

function getCommonPlugins() {
  return _.filter([
    new webpack.BannerPlugin('string stuff'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      VERSION: JSON.stringify(packageJson.version)
    }),
    process.env.CI ? undefined : new WebpackNotifierPlugin({
      title: 'angular-formly',
      contentImage: here('other/logo/angular-formly-logo-64px.png')
    })
  ]);
}
