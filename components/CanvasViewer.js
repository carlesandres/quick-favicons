import React, { useState, useRef, useEffect } from 'react';
import { roundRect } from 'components/utils';

const Canvas = props => {
  const canvasRef = useRef(null);
  const [iconSVG, setIconSVG] = useState();
  const [loading, setLoading] = useState(false);

  const draw = (ctx, color = '#333', letter = 't', radius = 0, icon, fgcolor) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = color;
    const width = ctx.canvas.width;
    const half = width / 2;

    const radNum = parseInt(radius, 10);
    roundRect(ctx, 0, 0, width, width, radNum);

    // Draw letter
    if (props.type === 'letter') {
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

  const download = () => {
    const canvas = canvasRef.current;
    const strData = canvas.toDataURL('image/png', 1.0);

    const name = `icon-col-${props.color}-rad-${props.radius}-letter-${props.letter}.png`;

    const link = document.createElement('a');
    link.download = name;
    link.href = strData;
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, props.color, props.letter, props.radius, iconSVG, props.fgcolor);
  }, [draw, props.color, props.letter, props.radius, iconSVG, props.fgcolor]);

  useEffect(() => {
    const updateIcon = async () => {
      setIconSVG();
      if (!props.icon) {
        return;
      }

      setLoading(true);
      try {
        const imgUrl = `icons/${props.icon}.svg`;
        const resp = await fetch(imgUrl);
        const XML = await resp.text();
        const domparser = new DOMParser();
        const ppp = domparser.parseFromString(XML, 'image/svg+xml');
        const svg = ppp.querySelector('svg');
        const viewBox = svg && svg.getAttribute('viewBox');
        const [, , width, height] = viewBox?.split(' ');

        const domPath = ppp.querySelector('path');
        const path = domPath?.getAttribute('d');
        if (!path) {
          setLoading(false);
          return;
        }

        const path2D = new Path2D(path);
        const icon = {
          path2D,
          width: parseInt(width, 10),
          height: parseInt(height, 10)
        };

        setIconSVG(icon);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    };
    updateIcon();
  }, [props.icon]);

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <section className="preview text-center">
      <style jsx>{`
        canvas {
          width: 200px;
          height: 200px;
          margin: 0 auto;
        }

        path {
          fill: blue;
          stroke: red;
        }

        button:hover {
          opacity: 0.5;
          cursor: pointer;
        }
      `}</style>
      <h1 className="font-bold text-3xl mb-10">Preview</h1>
      <canvas
        width={1000}
        height={1000}
        ref={canvasRef} {...props}/>
      <div className="mt-12">
        <button className="p-4 border rounded bg-gray-500"
          onClick={download}>Download</button>
      </div>
    </section>
  );
};

export default Canvas;
