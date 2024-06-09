import CopyWebpackPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration } from "webpack";

export const webpackBasePlugins = [
  new HtmlWebpackPlugin({
    template: "./src/index.html",
    favicon: "./src/favicon.ico",
  }),
  new ForkTsCheckerWebpackPlugin({
    async: true,
    typescript: {
      configOverwrite: {
        include: ["./src"],
        exclude: ["./node_modules", "./maintenance"],
      },
    },
  }),
];
const config: Configuration = {
  mode: "production",
  target: "web",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        include: /src/,
        exclude: [/node_modules/, /maintenance/],
        options: {
          onlyCompileBundledFiles: true,
          transpileOnly: true,
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    ...webpackBasePlugins,
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./node_modules/@davidbucodes/gengo-view-indices/*.index.json",
          to: "./indices/[name].json",
        },
        {
          from: "./node_modules/@davidbucodes/gengo-view-kanji-svgs/svgByKanji.json",
          to: ".",
        },
      ],
    }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default config;
