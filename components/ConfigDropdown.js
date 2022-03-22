import { Menu } from '@headlessui/react'
import { FiFile } from 'react-icons/fi';
import { getAllObjects } from 'utils/localStorage';
import { useState, useEffect } from 'react';

const ConfigDropdown = (props) => {
  const [ allConfigs, setAllconfigs ] = useState([]);
  useEffect( () => {
    const configs = getAllObjects();
    setAllconfigs(configs);
  }, []);

  const menuItems = allConfigs.map( item =>
    <Menu.Item key={item.id}>
      <a> {item.id || '(unknown id)'}</a>
    </Menu.Item>
  );

  return (
    <Menu as="button" className="relative flex items-center">
      <Menu.Button><FiFile /></Menu.Button>
      <Menu.Items className="absolute right-0 top-6 w-56 mt-2 z-10 origin-top-right flex flex-col bg-gray-500 p-4 text-base rounded-sm">
        {menuItems}
      </Menu.Items>
    </Menu>
  );
};

export default ConfigDropdown;
