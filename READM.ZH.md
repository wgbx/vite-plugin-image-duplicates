<h1 align="center">vite-plugin-image-duplicates</h1>
<p align="center">查找项目中是否有重复图片</p>

## 配置项

| **配置项名称** | **必要** | **含义**           | **默认值** | **类型**  |
| -------------- | ------------ | --------           | ---------- | --------  |
| `imagePath`    | 否           | 需要查找的图片路径 | src        | `string`  |
| `imageType`    | 否           | 需要查找的图片类型 | ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']|`Array<string>` |
| `imageType`    | 否           | 输出的资源路径格式 | false      | `Boolean` |

## [安装](https://www.npmjs.com/package/vite-plugin-image-duplicates)

```bash
npm install vite-plugin-image-duplicates -D
// or
pnpm add vite-plugin-image-duplicates -D
```

## 用法

- vue.config.js

```js
import imageDuplicates from 'vite-plugin-image-duplicates'

export default defineConfig({
  plugins: [vue(), imageDuplicates()],
})

```
