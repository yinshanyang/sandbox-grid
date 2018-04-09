import { resolve } from 'path'
import webpack from 'webpack'

const config = {
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        include: resolve(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {}
  },
  externals: {},
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  stats: 'minimal'
}

export default config
