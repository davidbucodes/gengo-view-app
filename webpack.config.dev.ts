import { Configuration } from "webpack";
// import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import "webpack-dev-server";
import prodConfig, { webpackBasePlugins } from "./webpack.config";

const config: Configuration = {
  ...prodConfig,
  plugins: [
    ...webpackBasePlugins,
    // new BundleAnalyzerPlugin({ analyzerMode: "server" }),
  ],
  mode: "development",
  devtool: "source-map",
  devServer: {
    port: 5000,
    hot: "only",
    open: true,
    liveReload: false,
    static: __dirname + "/dist",
  },
};

export default config;
