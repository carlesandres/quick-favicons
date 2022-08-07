import { Menu } from '@headlessui/react'
import { FiFile } from 'react-icons/fi';
import { getAllObjects, loadObject } from 'utils/localStorage';
import { useState, useEffect } from 'react';

const ConfigDropdown = (props) => {
  const { onLoad } = props;
  const [ allConfigs, setAllconfigs ] = useState();
  useEffect( () => {
    const configs = getAllObjects();
    setAllconfigs(configs);
  }, []);

  if (!allConfigs) {
    return null;
    }

  const loadItem = event => {
    const itemId = event.currentTarget.dataset?.itemId;
    if (itemId) {
      const obj = loadObject(itemId);
      onLoad(obj);
    }
  }

  const menuItems = allConfigs?.length ? allConfigs.map( (item, index) =>
    <Menu.Item key={item.id}>
      <button 
        data-item-id={item.id}
        onClick={loadItem}
      className="hover:text-blue-300">{`Item ${index+1}`}</button>
    </Menu.Item>
  ): <p>No configs saved yet</p>;

  return (
    <Menu as="div" className="relative flex items-center transition-all">
      <Menu.Button className="hover:text-blue-300"><FiFile /></Menu.Button>
      <Menu.Items className="absolute -right-2 top-8 w-56 mt-2 z-10 
        origin-top-right flex flex-col bg-gray-500 space-y-2
        p-4 text-base rounded-sm">
        {menuItems}
      </Menu.Items>
    </Menu>
  );
};

export default ConfigDropdown;
