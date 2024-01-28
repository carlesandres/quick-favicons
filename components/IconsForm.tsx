import IconsDropdown from 'components/IconsDropdown';

const IconsForm = (props) => {
  return (
    <div>

      <IconsDropdown
        value={props.icon}
        onChange={props.onChangeIcon}
      />
    </div>
  );
};

export default IconsForm;
