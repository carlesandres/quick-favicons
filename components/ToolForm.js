import TextControl from 'components/TextControl';
import Dropdown from 'components/Dropdown';
import IconsDropdown from 'components/IconsDropdown';

const ToolForm = (props) => {
  const { config, onChange } = props;


  const onChangeBGColor = color =>  onChange({ ...config, color }); 
  const onChangeFGColor = fgcolor =>  onChange({ ...config, fgcolor });
  const onChangeLetter = letter => { onChange({ ...config, letter }); };
  const onChangeIcon = icon => { onChange({ ...config, icon }); };
  const onChangeRadius = radius => { onChange({ ...config, radius }); };
  const onChangeIconPadding = padding => { onChange({ ...config, padding }); };
  const onChangeType = event => onChange({ ...config, type:event.target.value});

  const iconsDr = <IconsDropdown
    value={config.icon}
    onChange={onChangeIcon}
  />;

  const letterControl =
    <TextControl
      label="Letter"
      value={config.letter || ''}
      onChange={onChangeLetter}
    />;

  const typeControl = props.type === 'letter' ? letterControl : iconsDr;

  return (
    <div className="section text-lg bg-gray-300 p-4 rounded flex flex-col space-y-4">
      <div className="flex ">
        <TextControl
          label="BG color"
          type="color"
          value={config.color}
          onChange={onChangeBGColor}
        />
        <TextControl
          label="FG color"
          type="color"
          value={config.fgcolor}
          onChange={onChangeFGColor}
        />
      </div>
      <div className="flex">
        <TextControl
          label="Border-radius (1-500)"
          type="number"
          min="0"
          max="500"
          step="5"
          value={config.radius || 0}
          onChange={onChangeRadius}
        />
        <TextControl
          label="Padding"
          type="number"
          min="0"
          max="100"
          step="5"
          value={config.padding}
          onChange={onChangeIconPadding}
        />{`%`}
      </div>
      <div className="flex">
        <Dropdown
          label = 'Type'
          onChange={onChangeType}
          value={config.type}
          options={props.types} />

        {typeControl}
      </div>
    </div>
  );
};

export default ToolForm;
