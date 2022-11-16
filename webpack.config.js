const path = require("path");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    mode: "production",
    entry: {
      app: "./src/indexApp.js",
    },
    output: {
      library: "App",
      path: path.resolve(__dirname, "..", "www", "js"),
      filename: "[name].min.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  },
  {
    mode: "production",
    entry: {
      "react-plots": "./src/indexReactPlots.js",
    },
    output: {
      path: path.resolve(__dirname, "..", "www", "js"),
      filename: "[name].min.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
    optimization: {
      minimizer: [new TerserPlugin({
        extractComments: false,
      })],
    },
    externals: {
      react: 'jsmodule["react"]',
      "react-dom": 'jsmodule["react-dom"]',
      "@/shiny.react": 'jsmodule["@/shiny.react"]',
    },
  },
];
