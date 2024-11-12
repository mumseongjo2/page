import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
  base: '/arcade/',
  resolve: {
    alias: [
      { find: '@src', replacement: resolve(__dirname, 'src') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@home', replacement: resolve(__dirname, 'src/pages/home') },
      { find: '@minesweeper', replacement: resolve(__dirname, 'src/pages/minesweeper') },
      { find: '@tetris', replacement: resolve(__dirname, 'src/pages/tetris') },
      { find: '@states', replacement: resolve(__dirname, 'src/states') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@@types', replacement: resolve(__dirname, 'src/types') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
    ],
  },
})
