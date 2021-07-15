const ESLintPlugin = require("eslint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpack = require("webpack"); // to access built-in plugins

const esLintOptions = {
  eslintPath: require.resolve("eslint"),
};

function getConfig(devMode) {
  const config = {
    optimization: {
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    entry: {
      index: "./src/index.tsx",
    },
    output: {
      filename: "[name].js",
      chunkFilename: devMode ? "[name].js" : "[contenthash].js",
      path: __dirname + "/public",
      publicPath: "/public/",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules[\/\\](?!(react-hook-form)[\/\\])/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules[\/\\](?!(react-hook-form)[\/\\])/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: ["/node_modules/"],
          use: [
            {
              loader: "babel-loader",
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.css$/i,
          use: [
            // Creates `style` nodes from JS strings
            devMode ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            { loader: "css-loader", options: { import: false } },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: ["url-loader"],
        },
      ],
    },
    plugins: [
      new webpack.ProgressPlugin(),
      new ESLintPlugin(esLintOptions),
    ].concat(
      devMode
        ? []
        : [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
    ),
    devtool: devMode ? "source-map" : false,
  };
  return config;
}

module.exports = (env, argv) => {
  var isDevMode = argv.mode !== "production";
  return getConfig(isDevMode);
};
