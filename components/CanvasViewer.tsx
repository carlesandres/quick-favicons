import React, { useState, useRef, useEffect } from 'react';
import { draw } from 'utils/draw';
import { createSvgFromIcon } from 'utils/createSvgFromIcon';
import InfoTooltip from 'components/InfoTooltip';

interface Svg {
  path2D: Path2D;
  width: number;
  height: number;
}

import { nanoid } from 'nanoid';

interface CanvasProps {
  color: string;
  letter: string;
  radius: number;
  type: string;
  icon: string;
  fgcolor: string;
  iconPadding: number;
  motifPadding: number;
  noBackground: boolean;
}

const Canvas = (props: CanvasProps) => {
  const canvasRef = useRef();
  const [iconSVG, setIconSVG] = useState<Svg | null>(null);
  const [, setLoading] = useState(false);

  const download = () => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) {
      return null;
    }
    const strData = canvas.toDataURL('image/png', 1.0);

    const link = document.createElement('a');
    link.download = `${nanoid()}.png`;
    link.href = strData;
    link.click();
  };

  useEffect(() => {
    if (!canvasRef?.current) {
      return null;
    }
    const canvas = canvasRef.current as HTMLCanvasElement;
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
      noBackground: props.noBackground,
    });
  }, [
    props.color,
    props.noBackground,
    props.letter,
    props.iconPadding,
    props.motifPadding,
    props.radius,
    props.type,
    iconSVG,
    props.fgcolor,
  ]);

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

  return (
    <section className="preview text-center">
      <div className="canvas-container inline-block h-28 w-28">
        <canvas
          className="h-full w-full"
          width={1000}
          height={1000}
          ref={canvasRef}
        />
      </div>
      <div className="mt-12 flex items-center justify-center space-x-2">
        <button
          className="rounded border bg-blue-500 p-2 
          text-white transition hover:bg-blue-600"
          onClick={download}
        >
          Download
        </button>
        <InfoTooltip>
          <p className="py-4">
            {' '}
            Once downloaded, add it to the
            <i> {`<head>`} </i>
            element of your site like this:
          </p>
          <p className="border bg-gray-100 p-4 font-mono">
            {' '}
            {`<link rel="icon" href="/path/favicon.png" type="image/png" sizes="1000x1000"/>`}
          </p>
        </InfoTooltip>
      </div>
    </section>
  );
};

export default Canvas;
