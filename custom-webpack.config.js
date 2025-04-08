const Dotenv = require('dotenv-webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['postcss-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      systemvars: true,
    }),
  ],
};
