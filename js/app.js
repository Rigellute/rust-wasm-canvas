import { memory } from '../crate/pkg/rust_webpack_bg';
import { Image } from '../crate/pkg/rust_webpack';

const image = Image.new();
const pixelsPointer = image.pixels_ptr();
const pixels = new Uint8Array(memory.buffer, pixelsPointer, 6);

function numToHex(num) {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

function drawPixel({ x, y, colors, canvas }) {
  const ctx = canvas.getContext('2d');

  const [red, green, blue] = colors;

  ctx.fillStyle = `#${numToHex(red)}${numToHex(green)}${numToHex(blue)}`;
  ctx.fillRect(x, y, 100, 100);
}

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
drawPixel({
  x: 0,
  y: 0,
  colors: pixels.slice(0, 3),
  canvas
});
drawPixel({
  x: 100,
  y: 0,
  colors: pixels.slice(3, 6),
  canvas
});
