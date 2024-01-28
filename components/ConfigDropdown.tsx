import { useCallback } from 'react';
import { Menu } from '@headlessui/react'
import { FiFile } from 'react-icons/fi';
import { getAllObjects, loadObject, removeObject } from 'utils/localStorage';
import { useState, useEffect } from 'react';
import { CgTrash } from 'react-icons/cg';

interface ConfigDropdownProps {
  onLoad: (obj: any) => void;
}

const ConfigDropdown = (props: ConfigDropdownProps) => {
  const { onLoad } = props;
  const [ allConfigs, setAllconfigs ] = useState([]);

  const updateConfigs = useCallback( () => {
    const configs = getAllObjects();
    setAllconfigs(configs);
  },[]);

  useEffect( () => {
    updateConfigs();
  }, [updateConfigs]);

  if (!allConfigs) {
    return null;
  }

  const loadItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = event.currentTarget.dataset?.itemId;
    if (itemId) {
      const obj = loadObject(itemId);
      onLoad(obj);
    }
  }

  const deleteConfig = (event: React.MouseEvent<HTMLButtonElement>) => {
    const itemId = event.currentTarget.dataset?.itemId;
    if (itemId) {
      removeObject(itemId);
      updateConfigs();
    }
  }

  const menuItems = allConfigs?.length ? allConfigs.reverse().map( (item, index:number) => {
    const displayName = item.configName || `Config ${index+1}`;
    return (
      <Menu.Item key={item.id}>
        <div className="flex">
        <button 
          data-item-id={item.id}
          onClick={loadItem}
          className="px-2 flex-1 hover:text-blue-300 text-left 
            whitespace-nowrap overflow-hidden text-ellipsis">{displayName}</button>
        <button 
          onClick={deleteConfig} 
          data-item-id={item.id}
            className="hover:text-blue-300 flex-shrink-0"><CgTrash /></button>

        </div>
      </Menu.Item>
    )}
  ) : <p className="py-8 text-gray-400 text-center">No configs saved yet</p>;

  return (
    <Menu as="div" className="relative flex items-center transition-all">
      <Menu.Button className="hover:text-blue-300"><FiFile /></Menu.Button>
      <Menu.Items className="absolute -right-2 top-9 w-56 z-10 
        origin-top-right p-4 flex flex-col bg-gray-700 space-y-2
        text-base rounded-sm max-h-72 overflow-y-auto">
        {menuItems}
      </Menu.Items>
    </Menu>
  );
};

export default ConfigDropdown;
