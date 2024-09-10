import { defineConfig } from 'rolldown';
import { globSync } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// 获取所有 TypeScript 文件作为入口
const inputFiles = globSync('src/**/*.ts')
  .filter((file) => !file.includes('__tests__'))
  .reduce((entries, file) => {
    const relativePath = path.relative('src', file);
    const withoutExtension = relativePath.replace(/\.ts$/, ''); // 去掉 .ts 后缀
    entries[withoutExtension] = fileURLToPath(new URL(file, import.meta.url));
    return entries;
  }, {});
export default defineConfig([
  {
    input: inputFiles,
    platform: 'browser',
    output: {
      format: 'esm',
      dir: 'dist', // 输出目录
      preserveModules: true, // 保留模块层级结构
      preserveModulesRoot: 'src', // 保留模块的根目录
      entryFileNames: '[name].js', // 保持文件层级结构
    },
  },
]);