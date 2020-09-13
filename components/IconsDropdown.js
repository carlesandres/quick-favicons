import Dropdown from 'components/Dropdown';
import { icons } from 'components/icons.json'

const IconsDropdown = (props) => {
  const change = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <Dropdown
      label="icons"
      options={icons}
      value={props.icon}
      onChange={change}
    />
  );
};

export default IconsDropdown;
