import React, { useState, useRef, useEffect } from 'react';
import { draw } from 'utils/draw';
import { createSvgFromIcon } from 'utils/createSvgFromIcon';

const Canvas = props => {
  const canvasRef = useRef();
  const [iconSVG, setIconSVG] = useState();
  const [, setLoading] = useState(false);

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
      fgcolor: props.fgcolor,
      padding: props.iconPadding,
      motifPadding: props.motifPadding,
      noBackground: props.noBackground
    });
  }, [
    props.color, 
    props.noBackground, 
    props.letter, props.iconPadding, 
    props.motifPadding,
    props.radius, props.type, iconSVG, props.fgcolor]);


  useEffect(() => {
    const updateIcon = async () => {
      if (!props.icon) {
        return;
      }

      setLoading(true);
      try {
        const svg = await createSvgFromIcon(props.icon);
        setLoading(false);
        setIconSVG(svg);
      } catch (err) {
        setLoading(false);
      }
    };
    updateIcon();
  }, [props.icon]);

  const { iconPadding, motifPadding, noBackground, ...canvasProps } = props;

  return (
    <section className="preview text-center">
      <div className="canvas-container inline-block">
        <style jsx>{`
          .canvas-container {
            background: radial-gradient(black 0px, transparent 1px);
            background-size: 10px 10px;
          }
        `}</style>
        <canvas
          width={1000}
          height={1000}
          ref={canvasRef} {...canvasProps}/>
      </div>
      <div className="mt-12">
        <button className="p-2 border rounded bg-blue-400 
          hover:bg-blue-500 text-white"
          onClick={download}>Download</button>
      </div>
      </section>
  );
};

export default Canvas;
