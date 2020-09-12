import Head from 'next/head'
import Button from 'components/Button';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import { useState } from 'react';

export default function Home() {
  const [color, setColor] = useState('#333');

  const asetColor = col => {
    console.log('col', col);
    setColor(col);
  };

  return (
    <div className="container">
      <Head>
        <title>Fast Favicon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <style jsx global>{`
        body {
          margin: 0;
          font-family: monospace;
          font-size: 16px;
        }
          nav {
            padding: 10px;
            background: #333;
            color: #fff;
          }

          .grid {
          padding: 20px;
          }
        `}</style>
        <nav>
          <div>Fast Favicon</div>
        </nav>


        <div className="grid">
          <ToolForm
            color={color}
          onChangeColor={asetColor}/>
          <div className="preview">
            <CanvasViewer color={color}/>
          </div>
        </div>
      </main>

      <footer>
      </footer>
    </div>
  )
}
