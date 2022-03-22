import Head from 'next/head';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import SaveCurrentConfig from 'components/SaveCurrentConfig';
import ConfigDropdown from 'components/ConfigDropdown';
import { useState } from 'react';
import icons from 'components/icons.json';
const types = ['letter', 'svg'];

export default function Home () {
  const [color, setColor] = useState('#333');
  const [fgcolor, setFGColor] = useState('#ffffff');
  const [letter, setLetter] = useState('t');
  const [radius, setRadius] = useState(100);
  const [icon, setIcon] = useState(icons.icons[0]);
  const [type, setType] = useState(types[0]);
  const [iconPadding, setIconPadding] = useState(0);

  const canvasProps = { radius, color, fgcolor, letter, icon, iconPadding, type };

  return (
    <div className="">
      <Head>
        <title>Quick Favicons</title>
        <link rel="icon" href="/favicon.png" sizes="1000x1000"/>
        <meta
          name="description"
          content="Create a favicon in seconds not minutes. Quick and simple." />
        <meta name="google-site-verification" content="55YTawSTZLLFaN4ftfgi-owRhc5Clh77hJ6mESPDEgE" />
      </Head>

      <nav className="p-4 bg-gray-700 text-white flex justify-between">
        <div>Quick Favicons</div>
        <div className="flex space-x-4">
          <SaveCurrentConfig canvasProps={canvasProps}/>
          <ConfigDropdown />
        </div>
      </nav>
      <main className="max-w-4xl mx-auto">
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
        <section className="p-10">
          <p className="py-4"> {`Once dowloaded, just add it to the <head> element like this:`}</p>
          <p className="border p-4 font-mono bg-gray-100"> {`<link rel="icon" href="/path/favicon.png" type="image/png" sizes="1000x1000"/>`}</p>
        </section>
      </main>
    </div>
  );
}
