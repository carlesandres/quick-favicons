import React, { useRef, useEffect } from 'react'
import { roundRect } from 'components/utils';

const Canvas = props => {

  const canvasRef = useRef(null)

  const draw = (ctx, color = '#333', letter = 't') => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    console.log('ctx.canvas.width', ctx.canvas.width);
    ctx.fillStyle = color;
    const width = ctx.canvas.width / 2;
    const half = width / 2;

    roundRect(ctx,0,0, width, width, width/5);
    // ctx.beginPath()
    // ctx.arc(half, half, half, 0, 2*Math.PI)
    // ctx.fill()

    // Draw letter
    ctx.fillStyle = 'white';
    const fSize = half;
    ctx.font = `bold normal ${half*1.8}px monospace`;
    ctx.fillText(letter, half/2, 3*half / 2);
  }

  const download = () => {
    const canvas = canvasRef.current
    const strData = canvas.toDataURL('image/png', 1.0);

    const link = document.createElement('a');
    link.download = `${'icon'}.png`;
    link.href = strData;
    link.click();
  };

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    draw(context, props.color)
  }, [draw, props.color])

  return (
    <div>
      <style jsx>{`
        canvas {
          width: 200px;
          height: 200px;
       }
      `}</style>
      <canvas
        width={1000}
        height={1000}
        ref={canvasRef} {...props}/>
      <button onClick={download}>Download</button>
    </div>
  );
}

export default Canvas
