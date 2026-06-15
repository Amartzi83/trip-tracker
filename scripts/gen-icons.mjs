import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'fs';

const svg = readFileSync('./public/icon.svg', 'utf-8');

for (const size of [192, 512]) {
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: size } });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  writeFileSync(`./public/icon-${size}.png`, pngBuffer);
  console.log(`✓ icon-${size}.png created (${pngBuffer.length} bytes)`);
}
