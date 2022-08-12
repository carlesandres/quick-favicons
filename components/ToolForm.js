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
  const onChangeIconPadding = iconPadding => { onChange({ ...config, iconPadding }); };
  const onChangeMotifPadding = motifPadding => { onChange({ ...config, motifPadding }); };
  const onChangeType = event => onChange({ ...config, type:event.target.value});
  const onChangeNoBg = event => onChange({ ...config, noBackground:event.target.checked});

  const iconsDr = <IconsDropdown
    value={config.icon}
    onChange={onChangeIcon}
  />;

  const letterControl =
    <TextControl
      label="Character"
      value={config.letter || ''}
      onChange={onChangeLetter}
      maxLength={1}
      className="w-8 text-center rounded-sm p-1"
    />;

  const typeControl = config.type === 'character' ? letterControl : iconsDr;

  return (
    <div className="text-sm bg-gray-300 p-6 h-full flex 
      flex-col space-y-4">
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
        <div className="flex items-center">
        <input 
          type="checkbox" 
          value={config.noBackground} 
          onChange={onChangeNoBg}
          />
          <span className="ml-2">No background
          </span>        </div>
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
          label="Outer Padding %"
          type="number"
          min="0"
          max="100"
          step="5"
          value={config.iconPadding}
          onChange={onChangeIconPadding}
        />
        <TextControl
          label="Motif Padding %"
          type="number"
          min="0"
          max="100"
          step="5"
          value={config.motifPadding}
          onChange={onChangeMotifPadding}
        />
        <Dropdown
          label = 'Type'
          onChange={onChangeType}
          value={config.type}
          options={props.types} />

        {typeControl}
    </div>
  );
};

export default ToolForm;
