import Head from 'next/head';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import { useState } from 'react';
const types = ['letter', 'svg'];

export default function Home () {
  const [color, setColor] = useState('#333');
  const [fgcolor, setFGColor] = useState('#ffffff');
  const [letter, setLetter] = useState('t');
  const [radius, setRadius] = useState(100);
  const [icon, setIcon] = useState();
  const [type, setType] = useState(types[0]);
  const [iconPadding, setIconPadding] = useState(0);

  const canvasProps = { radius, color, fgcolor, letter, icon, iconPadding, type };

  return (
    <div className="">
      <Head>
        <title>Quick Favicons</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav>
        <div>Quick Favicons</div>
      </nav>
      <main>
        <section className="p-10">
          <ToolForm
            color={color}
            fgcolor={fgcolor}
            letter={letter}
            radius={radius}
            icon={icon}
            type={type}
            types={types}
            iconPadding={iconPadding}
            onChangeColor={setColor}
            onChangeFGColor={setFGColor}
            onChangeLetter={setLetter}
            onChangeRadius={setRadius}
            onChangeIcon={setIcon}
            onChangeIconPadding={setIconPadding}
            onChangeType={setType}
          />
        </section>
        <section className="p-10">
          <CanvasViewer {...canvasProps} />
        </section>
      </main>
    </div>
  );
}
