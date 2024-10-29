<h1 align="center">vite-plugin-image-duplicates</h1>
<p align="center">Find whether there are duplicate images in the project</p>
<p align="center">[简体中文](./READM-ZH.md)</p>

## Configuration Options

| **Configuration Option Name** | **Required** | **Meaning**           | **Default Value** | **Type**  |
| -------------- | ------------ | --------           | ---------- | --------  |
| `imagePath`    | No           | The image path to be searched | src        | `string`  |
| `imageType`    | No           | The image types to be searched | ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp']|`Array<string>` |
| `outputResourcePathFormat`    | No           | The output resource path format | false      | `Boolean` |

## Installation

```bash
npm install vite-plugin-image-duplicates -D
// or
pnpm add vite-plugin-image-duplicates -D
```

## Usage

- vue.config.js

```js
import imageDuplicates from 'vite-plugin-image-duplicates'

export default defineConfig({
  plugins: [vue(), imageDuplicates()],
})

```
