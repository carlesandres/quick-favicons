import { useState } from 'react';
import { Combobox } from '@headlessui/react'
import icons from 'components/icons.json';

const IconsDropdown = (props) => {
  const [query, setQuery] = useState('')

  const filteredIcons = icons.icons.filter((icon) => {
    return icon.toLowerCase().includes(query.toLowerCase())
  })

  const clean = () => {
    setQuery('');
    props.onChange('');
  }

  const input = props.value ?
    <div className="relative border p-1 bg-gray-200 rounded-sm
      text-gray-600 ">
      {props.value}
      <span className="rounded h-4 w-4 border border-gray-900 p-1
        absolute -top-1 -right-1 text-xs leading-none bg-white
        " onClick={clean}>x</span>
    </div> :
    <Combobox.Input 
      autoFocus
      className="rounded-sm p-1 w-full"
      onChange={(event) => setQuery(event.target.value)} />

  return (
    <div>
      <label>Icon:</label>
      <Combobox 
        as="div"
        className="relative"
        value={props.icon} 
        onChange={props.onChange}>
        {input}
        <Combobox.Options className="absolute top-8 max-h-24 overflow-auto
          bg-gray-100 w-full text-sm rounded-sm">
          <div className="flex flex-col space-y-2 p-2">
            {filteredIcons.map((icon) => (
              <Combobox.Option 
                className="hover:bg-gray-200 cursor-pointer flex space-x-2 items-center"
                key={icon} 
                value={icon}>
                <img className="w-4 h-4" src={`icons/${icon}.svg`} alt={icon} />
                <span>{icon}</span>
              </Combobox.Option>
            ))}
          </div>
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

export default IconsDropdown;
