import { roundRect } from 'components/utils';

export const draw = (props, ) => {
  const { ctx, color = '#333', letter = 't', radius = 0, icon, fgcolor, type } = props;
  if (!ctx?.canvas) {
    return null;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = color;
  const width = ctx.canvas.width;
  const half = width / 2;

  const radNum = parseInt(radius, 10);
  roundRect(ctx, 0, 0, width, width, radNum);

  // Draw letter
  if (type === 'letter') {
    ctx.fillStyle = fgcolor || 'white';
    // const fSize = half;
    ctx.font = `bold normal ${half * 1.8}px monospace`;
    ctx.fillText(letter, half / 2, 3 * half / 2);
  } else if (icon) {
    const xScale = 1000 / icon.width;
    const yScale = 1000 / icon.height;
    ctx.scale(xScale, yScale);
    ctx.fillStyle = fgcolor || 'white';
    ctx.strokeStyle = fgcolor || 'white';
    ctx.stroke(icon.path2D);
    ctx.fill(icon.path2D);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
};

