import { createVuePlugin } from 'vite-plugin-vue2'
import { defineConfig } from 'vite'
import commonjs from "rollup-plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
  plugins: [createVuePlugin()],
  // 配置别名
  resolve: {
    // 设置路径别名
    alias: {
      '@': '/src',
      '@api': '/src/api', 
    },
    // 忽略后缀，不建议忽略.vue
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  
  // 针对生产环境（线上环境）
  build: {
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求， 设置为0 可以完全禁用此项,  一般为4094（4kb）, 1kb 等于 1024， 如果没设置，官方会默认为4096
    // 阈值不要设置太大，太大解码也很消耗性能
    // 只要图片小于8kb，会自动打包为base64格式
    assetsInlineLimit: 4096 * 2, // 8kb

    // 去除生产环境的console和debugger提示
    minify: 'terser',
    terserOptions: {
      // 去除console和debugger
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    },

    // 配置CDN加速，会请求离你最近的资源，可以加快网络请求，提高网络速度
    rollupOptions: {
      external: ['axios', 'moment'],
      plugins: [
        commonjs(),
        externalGlobals({
          axios: 'axios',
          moment: 'moment',
        }),
      ],
    },
  },

  // 代理跨域请求
  server: {
    // 如： /myapi/users 会被转发到 http: //localhost:4000/myapi/users
    proxy: {
      '/myapi': {
        target: 'http://localhost:4000', // 代理域名地址
        changeOrigin: true, // 保留请求源头 请求头
        rewrite: (path) => path.replace(/^\/myapi/, ''), // 重写url路径
      }
    }
  }
})