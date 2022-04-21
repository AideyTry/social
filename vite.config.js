/*
 * @Author: Aiden(戴林波)
 * @Date: 2021-12-17 17:33:16
 * @LastEditTime: 2022-04-21 10:01:43
 * @LastEditors: Aiden(戴林波)
 * @Description:
 * @Email: jason_dlb@sina.cn
 */
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
const dotenv = require('dotenv')
const fs = require('fs')
// https://vitejs.dev/config/
// export default defineConfig({
// plugins: [
//   uni(),
// ],
// server: {
//   sourcemap: false,
//   port: '80',
//   proxy: {
//     '/users': {
//         target: 'http://localhost:3000',
//         changeOrigin: true
//     }
// }
//   }
// })
export default defineConfig(({ command, mode }) => {
  console.log('command===', command)
  // process.env = {...process.env, ...loadEnv(mode, process.cwd())}
  let envFiles = []
  //根据不同的环境使用不同的环境变量
  if (command == 'serve') {
    envFiles = [
      /** default file */
      `.env.development`,
    ]
  } else {
    envFiles = [
      /** default file */
      `.env`,
      /** mode file */
      `.env.production`,
    ]
  }
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file))
    for (const k in envConfig) {
      process.env[k] = envConfig[k]
    }
  }
  console.log('process.env.BASE_URL==', process.env.BASE_URL)
  return {
    plugins: [uni()],
    define: {
      'process.env': {
        BASE_URL: process.env.BASE_URL
      }
    },
    build: {
      sourcemap: true,
    },
    server: {
      sourcemap: true,
      port: '80',
      proxy: {
        '^/dev': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev/, '')
        },
        '^/upload': {
          target: 'https://www.mancao.social/upload',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/upload/, '')
        },
        '^/download': {
          target: 'https://www.mancao.social/download',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/download/, '')
        },
      },
    },
  }
})
