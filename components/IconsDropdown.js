import { useState } from 'react';
import { Combobox } from '@headlessui/react'
import icons from 'components/icons.json';

const IconsDropdown = (props) => {
  const [query, setQuery] = useState('')

  const filteredIcons =
    query === ''
      ? icons.icons
      : icons.icons.filter((icon) => {
          return icon.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <Combobox 
      as="div"
      className="relative"
      value={props.icon} 
      onChange={props.onChange}>
      <Combobox.Input 
        className="rounded-sm p-1 w-full"
        onChange={(event) => setQuery(event.target.value)} />
      <Combobox.Options className="absolute top-10 max-h-24 overflow-auto
        bg-gray-100 text-sm">
        {filteredIcons.map((icon) => (
          <Combobox.Option 
            className="p-2 hover:bg-gray-200 cursor-pointer flex space-x-2"
            key={icon} 
            value={icon}>
            <img className="w-4 h-4" src={`icons/${icon}.svg`} alt={icon} />
            <span>{icon}</span>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  )
}

export default IconsDropdown;
