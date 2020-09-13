import Head from 'next/head'
import Button from 'components/Button';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import { useState } from 'react';

export default function Home() {
  const [color, setColor] = useState('#333');
  const [letter, setLetter] = useState('t');
  const [ radius, setRadius] = useState(100);

  return (
    <div className="container">
      <Head>
        <title>Quick Favicons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <nav>
          <div>Quick Favicons</div>
        </nav>
      <main>
        <div className="grid">
          <ToolForm
            color={color}
            letter={letter}
            radius={radius}
            onChangeColor={setColor}
            onChangeLetter={setLetter}
            onChangeRadius={setRadius}
          />
          <section className="preview">
            <CanvasViewer
              radius={radius}
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
