'use strict'
const svgToMiniDataURI = require('mini-svg-data-uri')
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path')
const resolve = require('./resolve')

const shouldUseVueCompilerSfc = () => {
  const vueVersion = require('vue').version

  const [vueMajorValue, vueMinorValue, _] = vueVersion.split('.')

  const vueMajorVersion = Number(vueMajorValue)
  const vueMinorVersion = Number(vueMinorValue)

  if (vueMajorVersion >= 3) {
    return true
  }

  if (vueMajorVersion === 2 && vueMinorVersion >= 7) {
    return true
  }

  return false
}

const baseWebpackConfig = {
  context: resolve('/'),
  entry: {
    app: './src/main.ts'
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  output: {
    path: resolve('build'),
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.vue',
      '.json',
      '.graphql',
    ],
    alias: {
      // we still need alias when using vue3 proper otherwise we get this vue console warning:
      // "[Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue"
      // see: https://github.com/fengyuanchen/vue-feather/issues/8
      // this warning will usually appear if projects are creating vue instances on demand (i.e. runtime).
      vue: process.env.VUE_COMPAT_MODE ? '@vue/compat/dist/vue.esm-bundler.js' : 'vue/dist/vue.esm-bundler.js',
      '@': resolve('src'),
    },
    fallback: {
      setImmediate: false,
      dgram: false,
      fs: false,
      net: false,
      tls: false,
      child_process: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              }
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          ...(process.env.VUE_COMPAT_MODE ? {
            compilerOptions: {
              // preserve is supposed to be the default
              // see: https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler#options
              // but as of 2022-01-13 (vue 3.2.26)
              whitespace: 'preserve',
              compatConfig: {
                MODE: process.env.VUE_COMPAT_MODE,
              }
            }
          } : {}),
          loaders: {
            css: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
            postcss: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
            sass: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                  indentedSyntax: true,
                },
              },
            ],
            scss: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          },
          cssSourceMap: true,
          cacheBusting: true,
          transformToRequire: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
          configFile: 'tsconfig.build.json'
        },
        include: [
          resolve('src'),
          path.join(require.resolve('webpack-dev-server'), '../../client'),

        ],
        exclude: [
          resolve('test')
        ]
      },
      {
        test: /\.(js|mjs)$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          path.join(require.resolve('webpack-dev-server'), '../../client'),
        ]
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/img/[name].[hash:7].[ext][query]'
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset/inline',
        generator: {
          dataUrl: content => svgToMiniDataURI(content.toString()),
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/media/[name].[hash:7].[ext][query]'
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
        generator: {
          filename: 'static/fonts/[name].[hash:7].[ext][query]'
        },
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: './tsconfig.build.json',
        extensions: {
          vue: {
            enabled: true,
            compiler: shouldUseVueCompilerSfc() ? '@vue/compiler-sfc' : 'vue-template-compiler',
          },
        },
      },
    }),
    new VueLoaderPlugin()
  ],
  node: false,
}

if (process.env.npm_config_report) {
  // To reduce dep tree webpack-bundle-analyzer is not installed in webpack-config.
  // If you are turning the report flag on in your package.json then you need to add webpack-bundle-analyzer as a dep.
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
  baseWebpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = baseWebpackConfig
