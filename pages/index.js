import Head from 'next/head'
import Button from 'components/Button';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import { useState } from 'react';

export default function Home() {
  const [color, setColor] = useState('#333');
  const [letter, setLetter] = useState('t');

  return (
    <div className="container">
      <Head>
        <title>Fast Favicon</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav>
          <div>Fast Favicon</div>
        </nav>
        <div className="grid">
          <ToolForm
            color={color}
            letter={letter}
            onChangeColor={setColor}
            onChangeLetter={setLetter}
          />
          <section className="preview">
            <CanvasViewer
              color={color}
              letter={letter}
            />
          </section>
        </div>
      </main>
      <footer> </footer>
    </div>
  )
}
