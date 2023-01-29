const path = require("path");
const webpack = require("webpack");
// const dotenv = require("dotenv").config({ path: __dirname + "/.env" });
// const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "/src/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env": JSON.stringify(dotenv.parsed),
  //     "process.env.NODE_ENV": JSON.stringify(
  //       isDevelopment ? "development" : "production"
  //     ),
  //   }),
  // ].filter(Boolean),
};
