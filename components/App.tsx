'use client';

import ToolForm from 'components/ToolForm';
import CanvasViewer from 'components/CanvasViewer';
//import SaveCurrentConfig from 'components/SaveCurrentConfig';
//import ConfigDropdown from 'components/ConfigDropdown';
import { useState } from 'react';

export type Config = typeof defaultConfig;

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

const App = () => {
  const [config, setConfig] = useState<Config>(defaultConfig);

  const onLoadConfig = (newConfig: Partial<Config>) => {
    setConfig({ ...config, ...newConfig });
  };

  return (
    <div className="flex flex-1 flex-col sm:flex-row">
      <aside className="">
        <ToolForm config={config} onChange={setConfig} types={types} />
      </aside>
      <main className="mx-auto max-w-4xl">
        <div className="flex space-x-4"></div>
        <section className="mt-10 sm:mt-20">
          <CanvasViewer {...config} />
        </section>
      </main>
    </div>
  );
};

export default App;
