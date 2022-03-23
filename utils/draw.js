import { roundRect } from 'components/utils';

export const draw = (props, ) => {
  const { ctx, color = '#333', letter = 't', radius = 0, icon, padding, fgcolor, type } = props;
  if (!ctx?.canvas) {
    return null;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fillStyle = color;
  const width = ctx.canvas.width;
  const half = width / 2;

  const radNum = parseInt(radius, 10);

  const reductionFactor = (100 - 2 * padding)/100;
  const iconWidth = width * reductionFactor;
  const topCorner = width * padding / 100;

  if (!props.noBackground) {
    roundRect(ctx, topCorner, topCorner, iconWidth, iconWidth, radNum);
  }

  // Draw letter
  if (type === 'letter') {
    ctx.translate(topCorner, topCorner);
    ctx.scale(reductionFactor, reductionFactor);
    ctx.fillStyle = fgcolor || 'white';
    // const fSize = half;
    ctx.font = `bold normal ${half * 1.8}px monospace`;
    ctx.fillText(letter, half / 2, 3 * half / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  } else if (icon) {
    const xScale = (1000 / icon.width) * reductionFactor
    const yScale = (1000 / icon.height) * reductionFactor
    ctx.translate(topCorner, topCorner);
    ctx.scale(xScale, yScale);
    ctx.fillStyle = fgcolor || 'white';
    ctx.strokeStyle = fgcolor || 'white';
    ctx.stroke(icon.path2D);
    ctx.fill(icon.path2D);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
};

