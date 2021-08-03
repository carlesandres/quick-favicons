const { flatten } = require('lodash');
const hexToHsl = require('hex-to-hsl');

const easeInOut = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

class mosaicClass {
  constructor (props, oCanvas, onFinishCb) {
    this.s = props;
    if (!this.s.image) {
      console.error('no image'); // eslint-disable-line no-console
      return;
    }
    this.onFinish = onFinishCb;
    const width = this.s.image.width * this.s.rowsInMosaic;
    const height = this.s.image.height * this.s.colsInMosaic;
    if (!width || !height) {
      console.error('mosaic width or height is invalid'); // eslint-disable-line no-console
      return;
    }
    if (typeof oCanvas === 'function') {
      this.canvas = new oCanvas(width, height); // eslint-disable-line new-cap
    } else if (oCanvas) {
      this.canvas = oCanvas;
    } else {
      console.error('problem with canvas'); // eslint-disable-line no-console
      return;
    }
    this.ctx = this.canvas.getContext('2d');
    this.drawMosaicInCanvas();
  }

  drawTranslatedRotatedImage (size, originX, originY, reverseX, reverseY, empty) {
    if (!this.s.image) {
      console.error('no image'); // eslint-disable-line no-console
      return;
    }

    if (empty) {
      return;
    }

    // const canvasSize = size * 4;

    const xCoef = reverseX ? 1 : -1;
    const yCoef = reverseY ? 1 : -1;
    this.ctx.save();
    this.ctx.translate(originX + size / 2, originY + size / 2);
    this.ctx.scale(xCoef, yCoef);
    this.ctx.drawImage(this.s.image, -size / 2, -size / 2, size, size);
    this.ctx.restore();
  }

  drawGradient (options) {
    // TO-DO: Is it width or height?
    const canvasSize = this.s.image.width * this.s.rowsInMosaic;
    const {
      color1 = '#333333', alpha1 = 1.0, color2 = '#ffffff', alpha2 = 1.0,
      spanPercentage, gradientPosition, gradientTransition
    } = options;

    const hsl1 = hexToHsl(color1);
    const hsl2 = hexToHsl(color2);

    const hueChangeDirection = hsl1[0] < hsl2[0] ? 360 : -360;

    const grd = this.ctx.createLinearGradient(0, canvasSize, 0, 0);

    const reverseDirectionHueDelta = options.revertGradientDirection ? hueChangeDirection : 0;

    const normalizedInitialPos = gradientPosition / 100;

    // Using a value of t between 0 and 1 is not precise enough due to the nature
    // of javascript number precision (like 0.1 + 0/2 <> 0.3)
    // which had bad effect on gradients
    for (let t = 0; t <= 100; t += 2) {
      // convert linear t to "easing" t:
      const offset = normalizedInitialPos + t / 100 * spanPercentage / 100;
      const frac1 = gradientTransition === 'easeinout' ? easeInOut(t / 100) : t / 100;
      const frac2 = 1 - frac1;
      const h = (hsl1[0] + reverseDirectionHueDelta) * frac1 + hsl2[0] * frac2;
      const s = hsl1[1] * frac1 + hsl2[1] * frac2;
      const l = hsl1[2] * frac1 + hsl2[2] * frac2;
      const a = frac1 * alpha1 + frac2 * alpha2;
      if (offset > 1) {
        break;
      }
      grd.addColorStop(offset, `hsla(${h}, ${s}%, ${l}%, ` + a + ')');
    }

    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawMosaicInCanvas () {
    const {
      rowsInMosaic,
      colsInMosaic,
      overallSymmetry,
      bgColor,
      bgColor2,
      // numEmptyColsBack,
      // numEmptyColsFront,
      addGradient,
      revertGradientDirection,
      gradientPosition,
      spanPercentage,
      gradientTransition,
      rowsToKeepClear,
      transparentBackground
    } = this.s;

    if (!this.ctx || !rowsInMosaic || !colsInMosaic) {
      return;
    }

    // TO-DO: Needs to be fixed (this woukdn't work if patchwork is not square)
    const size = this.s.image.width;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!transparentBackground) {
      this.drawGradient({
        color1: bgColor,
        alpha1: 1,
        color2: bgColor2,
        alpha2: 1,
        spanPercentage,
        gradientPosition,
        revertGradientDirection,
        gradientTransition
      });
    }

    const widths = Array(colsInMosaic)
      .fill(1)
      .map((content, index) => index * size);
    const heights = Array(rowsInMosaic)
      .fill(1)
      .map((content, index) => index * size);

    const arrayOfRowsToKeepClear = rowsToKeepClear.split(',')
      .map(numStr => {
        const cleanStr = numStr.trim();
        const num = parseInt(cleanStr, 10);
        if (Number.isInteger(num) && cleanStr === `${num}`) {
          return num;
        }
        return null;
      })
      .filter(x => x);

    const combinations = widths.map((width, numRow) => {
      const centralCol = Math.ceil(widths.length / 2);
      const row = heights.map((height, numCol) => ({
        width,
        height,
        reverseX: overallSymmetry ? numRow >= centralCol ? 1 : 0 : !(numRow % 2),
        reverseY: overallSymmetry ? 1 : !(numCol % 2),
        empty: arrayOfRowsToKeepClear.includes(numCol + 1)
        // numRow < numEmptyColsBack
        // || numRow >= widths.length - numEmptyColsBack
        // || numRow > centralCol - (numEmptyColsFront + 1) && numRow < centralCol + numEmptyColsFront
      }));
      return row;
    });

    const flatCombinations = flatten(combinations);
    // TO-DO: Width and height are not the correct names!!
    flatCombinations.forEach(({ width: originX, height: originY, reverseX, reverseY, empty }) => {
      const operation = () => this.drawTranslatedRotatedImage(size, originX, originY, reverseX, reverseY, empty, bgColor);
      operation();
    });

    // This is for drawing a gradient on top of the image,
    // the gradient at the back is always painted (at the moment)
    if (addGradient && !transparentBackground) {
      const operation = () => this.drawGradient({
        color1: bgColor,
        alpha1: 1,
        color2: bgColor,
        alpha2: 0,
        spanPercentage,
        gradientPosition,
        revertGradientDirection,
        gradientTransition
      });
      operation();
    }

    this.onFinish(this.canvas);
  }
}
