import fs from 'fs';
import path from 'path';
import ttf2woff2 from 'ttf2woff2';

const fontsDir = './public/assets/fonts';

for (const file of fs.readdirSync(fontsDir)) {
  if (file.endsWith('.ttf')) {
    const input = path.join(fontsDir, file);
    const output = path.join(fontsDir, file.replace('.ttf', '.woff2'));

    const ttf = fs.readFileSync(input);
    const woff2 = ttf2woff2(ttf);

    fs.writeFileSync(output, woff2);
    console.log(`✔ ${file} → ${path.basename(output)}`);
  }
}
