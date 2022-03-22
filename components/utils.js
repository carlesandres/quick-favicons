export function roundRect (ctx, x, y, w, h, radius) {
  // var r = x + w;
  // var b = y + h;
  // ctx.beginPath();
  // ctx.lineWidth="4";
  // ctx.moveTo(x+radius, y);
  // ctx.lineTo(r-radius, y);
  // ctx.quadraticCurveTo(r, y, r, y+radius);
  // ctx.lineTo(r, y+h-radius);
  // ctx.quadraticCurveTo(r, b, r-radius, b);
  // ctx.lineTo(x+radius, b);
  // ctx.quadraticCurveTo(x, b, x, b-radius);
  // ctx.lineTo(x, y+radius);
  // ctx.quadraticCurveTo(x, y, x+radius, y);
  //   ctx.fill()

  if (w < 2 * radius) radius = w / 2;
  if (h < 2 * radius) radius = h / 2;
  console.log('radius', radius);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
  ctx.fill();
}
