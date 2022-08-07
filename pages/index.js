import Head from 'next/head';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import SaveCurrentConfig from 'components/SaveCurrentConfig';
import ConfigDropdown from 'components/ConfigDropdown';
import { useState } from 'react';
import icons from 'components/icons.json';
const types = ['character', 'svg'];

const defaultConfig = {
  color: '#333333',
  fgcolor: '#ffffff',
  letter: 'a',
  radius: 100,
  icon: icons.icons[0],
  type: types[0],
  iconPadding: 0,
  motifPadding: 10,
  noBackground: false
};

export default function Home () {
  const [config, setConfig ] = useState(defaultConfig);

  const onLoadConfig = newConfig => {
    setConfig( {...config, ...newConfig});
  };

  return (
    <div className="min-h-screen flex flex-col">
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
          <SaveCurrentConfig canvasProps={config}/>
          <ConfigDropdown onLoad={onLoadConfig}/>
        </div>
      </nav>
      <div className="flex flex-1">
        <aside className="">
          <ToolForm
            config={config}
            onChange={setConfig}
            types={types}
            />
        </aside>
        <main className="max-w-4xl mx-auto">
          <section className="p-10">
            <CanvasViewer {...config} />
          </section>
          <section className="p-10">
            <p className="py-4"> {`Once dowloaded, just add it to the <head> element like this:`}</p>
            <p className="border p-4 font-mono bg-gray-100"> {`<link rel="icon" href="/path/favicon.png" type="image/png" sizes="1000x1000"/>`}</p>
          </section>
        </main>
      </div>
    </div>
  );
}
