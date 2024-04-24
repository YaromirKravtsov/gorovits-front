const fs = require('fs-extra');
const path = require('path');

async function copyStaticFiles() {
  try {
    // Путь к исходной директории со статическими файлами
    const sourceDir = path.resolve(__dirname, 'src/static/api');
    // Путь к директории dist
    const distDir = path.resolve(__dirname, 'dist/static/api');

    // Копирование файлов
    await fs.copy(sourceDir, distDir);

    console.log('Статические файлы скопированы успешно');
  } catch (error) {
    console.error('Произошла ошибка при копировании статических файлов:', error);
  }
}

copyStaticFiles();
