import { defineConfig } from 'umi'
import { resolve } from 'path'

export default defineConfig({
  antd: false,
  dva: false,
  title: 'Mongood',
  esbuild: {},
  history: { type: 'hash' },
  hash: true,
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
    },
  },
  forkTSChecker: {},
  chainWebpack(config) {
    config.module
      .rule('declaration')
      .test(/\.d\.ts$/)
      .include.add(resolve('./src/utils/editor/libs'))
      .end()
      .use('declaration')
      .loader('raw-loader')
  },
})
