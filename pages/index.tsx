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
  noBackground: false,
};

export type Config = typeof defaultConfig;

export default function Home() {
  const [config, setConfig] = useState<Config>(defaultConfig);

  const onLoadConfig = (newConfig: Partial<Config>) => {
    setConfig({ ...config, ...newConfig });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Head>
        <title>Quick Favicons</title>
        <link rel="icon" href="/favicon.png" sizes="1000x1000" />
        <meta
          name="description"
          content="Create a favicon in seconds not minutes. Quick and simple."
        />
        <meta
          name="google-site-verification"
          content="55YTawSTZLLFaN4ftfgi-owRhc5Clh77hJ6mESPDEgE"
        />
      </Head>

      <nav className="flex justify-between bg-gray-700 p-4 text-white">
        <div className="flex space-x-2">
          <div className="h-6 w-6">
            <Image src={logo} alt="Quick Favicons" />
          </div>
          <span>Quick Favicons</span>
          <span className="italic text-yellow-100">
            - Create a favicon in seconds, not minutes
          </span>
        </div>
        <div className="flex space-x-4">
          <SaveCurrentConfig canvasProps={config} />
          <ConfigDropdown onLoad={onLoadConfig} />
        </div>
      </nav>
      <div className="flex flex-1 flex-col sm:flex-row">
        <aside className="">
          <ToolForm config={config} onChange={setConfig} types={types} />
        </aside>
        <main className="mx-auto max-w-4xl">
          <section className="mt-10 sm:mt-20">
            <CanvasViewer {...config} />
          </section>
        </main>
      </div>
    </div>
  );
}
