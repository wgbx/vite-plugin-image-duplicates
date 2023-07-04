import { writeFileSync, readdirSync, existsSync, statSync, readFileSync } from 'fs';
import { resolve, join, extname } from 'path';
import log from 'picocolors';
import { createHash } from 'crypto';

interface UserOptions {
  imagePath: string;
  imageType: string[];
  isAbsolutePath: boolean;
}

const defaultOptions = {
  imagePath: 'src',
  imageType: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'],
  isAbsolutePath: false
};

const errorTip = (title: string, text: string): void => {
  console.log(`${log.bold(log.red(title))} ${text}`);
};

const getFileMap = (userOptions: UserOptions): Map<string, string[]> => {
  const { imagePath, imageType, isAbsolutePath } = userOptions;
  const assetPath = resolve(process.cwd());
  const absolutePath = resolve(process.cwd(), imagePath);
  const hashTable = new Map();

  const processFile = (filePath: string): void => {
    if (statSync(filePath).isDirectory()) {
      readdirSync(filePath).forEach((filename) => {
        processFile(join(filePath, filename));
      });
    } else if (imageType.includes(extname(filePath).toLowerCase())) {
      const fileData = readFileSync(filePath);
      const hash = createHash('md5').update(fileData).digest('hex');
      let fileRelativePath = filePath.replaceAll('\\', '/');
      if (!isAbsolutePath) {
        fileRelativePath = filePath.replace(assetPath, '').replaceAll('\\', '/');
      }
      if (hashTable.has(hash)) {
        hashTable.set(hash, [...hashTable.get(hash), fileRelativePath]);
      } else {
        hashTable.set(hash, [fileRelativePath]);
      }
    }
  };

  if (!existsSync(absolutePath)) {
    errorTip('文件夹不存在:', absolutePath);
    process.exit(0);
  }
  readdirSync(absolutePath).forEach((filename) => {
    const filePath = join(absolutePath, filename);
    processFile(filePath);
  });
  return hashTable;
};

const setFile = (data: object[], name = 'image-duplicates.json'): void => {
  try {
    writeFileSync(`./${name}`, JSON.stringify(data, null, 2));
  } catch (err) {
    log.red(`${name} 文件写入失败`);
  }
};

export default function imageDuplicates(options?: UserOptions) {
  return {
    name: 'vite-plugin-image-duplicates',
    async buildStart() {
      const userOptions = { ...defaultOptions, ...options };
      const dataMap = getFileMap(userOptions);
      const sameFile: object[] = [];
      dataMap.forEach((item) => {
        if (item.length > 1) {
          sameFile.push({ 'IdenticalPicture': item });
        }
      });
      setFile(sameFile);
    }
  };
}