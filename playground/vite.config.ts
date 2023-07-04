import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// @ts-ignore
import imageDuplicates from '../packages';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), imageDuplicates()],
})
