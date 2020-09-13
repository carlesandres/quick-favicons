import React, { useState, useRef, useEffect } from 'react'
import { roundRect } from 'components/utils';

const Canvas = props => {
  const canvasRef = useRef(null)
  const [ iconSVG, setIconSVG ] = useState();
  const [loading, setLoading] = useState(false);

  const draw = (ctx, color = '#333', letter = 't', radius = 0, icon) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = color;
    const width = ctx.canvas.width;
    const half = width / 2;

    const radNum = parseInt(radius, 10);
    roundRect(ctx,0,0, width, width, radNum );

    // Draw letter
    if (props.type === 'letter') {
      ctx.fillStyle = 'white';
      const fSize = half;
      ctx.font = `bold normal ${half*1.8}px monospace`;
      ctx.fillText(letter, half/2, 3*half / 2);
    } else if (icon) {
       ctx.drawImage(icon, 0, 0, 1000, 1000);
    }
  }

  const download = () => {
    const canvas = canvasRef.current
    const strData = canvas.toDataURL('image/png', 1.0);

    const name = `icon-col-${props.color}-rad-${props.radius}-letter-${props.letter}.png`;

    const link = document.createElement('a');
    link.download = name;
    link.href = strData;
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context, props.color, props.letter, props.radius, iconSVG)
  }, [draw, props.color, props.letter, props.radius, iconSVG])

  useEffect(() => {
    setIconSVG();
    if (!props.icon) {
      return;
    }

    setLoading(true);
    try {
    const img = new Image();
      img.onload = function() {
        setIconSVG(img);
        setLoading(false);
      }
      img.src = `icons/${props.icon}.svg`;
    } catch (err) {
      throw err;
      setLoading(false);
    }
  }, [props.icon])

  return (
    <section className="preview">
      <style jsx>{`
        canvas {
          width: 200px;
          height: 200px;
        }

        button {
          padding: 1em;
        }

        button:hover {
          opacity: 0.5;
          cursor: pointer;
        }

        .preview, .butt {
          text-align: center;
        }
        .butt {
          padding: 1em;
        }
      `}</style>
      <h1>Preview</h1>
      <canvas
        width={1000}
        height={1000}
        ref={canvasRef} {...props}/>
      <div className="butt">
        <button onClick={download}>Download</button>
      </div>
    </section>
  );
}

export default Canvas
