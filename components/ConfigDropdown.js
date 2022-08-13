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

  const menuItems = allConfigs?.length ? allConfigs.map( (item, index) => {
    const displayName = item.configName || `Config ${index+1}`;
    console.log('item', item);
    return (
      <Menu.Item key={item.id}>
        <button 
          data-item-id={item.id}
          onClick={loadItem}
          className="px-2 hover:text-blue-300 text-left">{displayName}</button>
      </Menu.Item>
    )}
  ) : <p>No configs saved yet</p>;

  return (
    <Menu as="div" className="relative flex items-center transition-all">
      <Menu.Button className="hover:text-blue-300"><FiFile /></Menu.Button>
      <Menu.Items className="absolute -right-2 top-8 w-56 mt-2 z-10 
        origin-top-right py-2 flex flex-col bg-gray-500 space-y-2
        text-base rounded-sm h-72 overflow-y-auto">
        {menuItems}
      </Menu.Items>
    </Menu>
  );
};

export default ConfigDropdown;
