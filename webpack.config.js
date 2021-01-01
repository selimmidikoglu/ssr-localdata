const path = require("path");

const config = {
  entry: {
    vendor: ["@babel/polyfill", "react"],
    app: "./src/components/index.js",
    business: "./src/components/OneBusinessComponent/oneBusiness.jsx"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].js",
    publicPath: '/public'
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader'],
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".wasm", ".mjs", "*"]
  }
};

module.exports = config;