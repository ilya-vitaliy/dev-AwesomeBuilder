import fs from 'fs';
import path from 'path';
import ttf2woff2 from 'ttf2woff2';

const fontsDir = './public/assets/fonts';

if (!fs.existsSync(fontsDir)) {
  console.error(`❌ Папка "${fontsDir}" не найдена`);
  process.exit(1);
}

const ttfFiles = fs.readdirSync(fontsDir).filter((f) => f.toLowerCase().endsWith('.ttf'));

if (ttfFiles.length === 0) {
  console.log('⚠️ Нет .ttf файлов для конвертации.');
  process.exit(0);
}

for (const file of ttfFiles) {
  const inputPath = path.join(fontsDir, file);
  const outputPath = path.join(fontsDir, file.replace(/\.ttf$/i, '.woff2'));

  try {
    const input = fs.readFileSync(inputPath);
    const output = ttf2woff2(input);
    fs.writeFileSync(outputPath, Buffer.from(output));
    console.log(`✅ ${file} → ${path.basename(outputPath)}`);
  } catch (err) {
    console.error(`❌ Ошибка при конвертации ${file}:`, err.message);
  }
}

console.log('\n🎉 Конвертация завершена!');
