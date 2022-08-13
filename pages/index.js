import Head from 'next/head';
import Image from 'next/image';
import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
import SaveCurrentConfig from 'components/SaveCurrentConfig';
import ConfigDropdown from 'components/ConfigDropdown';
import { useState } from 'react';
import logo from '../public/favicon.png';

const types = ['character', 'svg'];

const defaultConfig = {
  color: '#333333',
  fgcolor: '#ffffff',
  letter: 'a',
  radius: 100,
  icon: null,
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
        <div className="flex space-x-2">
          <div className="h-6 w-6">
            <Image src={logo} /> 
          </div>
          <div>Quick Favicons</div>
        </div>
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
          <p className="text-gray-500 pt-8 sm:pt-24">
          Create a favicon in seconds, not minutes.
          </p>
          <section className="mt-10 sm:mt-20">
            <CanvasViewer {...config} />
          </section>
        </main>
      </div>
    </div>
  );
}
