import React, { useState, useRef, useEffect } from 'react';
import { draw } from 'utils/draw';

const Canvas = props => {
  const canvasRef = useRef();
  const [iconSVG, setIconSVG] = useState();
  const [loading, setLoading] = useState(false);

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    const strData = canvas.toDataURL('image/png', 1.0);

    const name = `icon-col-${props.color}-rad-${props.radius}-letter-${props.letter}.png`;

    const link = document.createElement('a');
    link.download = name;
    link.href = strData;
    link.click();
  };

  useEffect(() => {
    if (!canvasRef?.current) {
      return null;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw({
      ctx: context,
      color: props.color,
      letter: props.letter,
      radius: props.radius,
      type: props.type,
      icon: iconSVG,
      fgcolor: props.fgcolor
    });
  }, [draw, props.color, props.letter, props.radius, props.type, iconSVG, props.fgcolor]);

  useEffect(() => {
    const updateIcon = async () => {
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
        const icon = Object.assign({}, {
          path2D,
          width: parseInt(width, 10),
          height: parseInt(height, 10)
        });

        setIconSVG(icon);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        throw err;
      }
    };
    updateIcon();
  }, [props.icon]);

  const { iconPadding, ...canvasProps } = props;

  return (
    <section className="preview text-center">
      <h1 className="font-bold text-3xl mb-10">Preview</h1>
      <canvas
        width={1000}
        height={1000}
        ref={canvasRef} {...canvasProps}/>
      <div className="mt-12">
        <button className="p-4 border rounded bg-blue-500 text-white"
          onClick={download}>Download</button>
      </div>
    </section>
  );
};

export default Canvas;
