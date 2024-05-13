import Dropdown from 'components/Dropdown';
import IconsDropdown from 'components/IconsDropdown';
import TextControl from 'components/TextControl';
import { Config } from '@/pages/index';

interface ToolFormProps {
  config: Config;
  onChange: (config: any) => void;
  types: string[];
}

const ToolForm = (props: ToolFormProps) => {
  const { config, onChange } = props;

  const onChangeBGColor = (color: Config['color']) =>
    onChange({ ...config, color });
  const onChangeFGColor = (fgcolor: Config['fgcolor']) =>
    onChange({ ...config, fgcolor });
  const onChangeLetter = (letter: Config['letter']) => {
    onChange({ ...config, letter });
  };
  const onChangeIcon = (icon: Config['icon']) => {
    onChange({ ...config, icon });
  };
  const onChangeRadius = (radius: Config['radius']) => {
    onChange({ ...config, radius });
  };
  const onChangeIconPadding = (iconPadding: Config['iconPadding']) => {
    onChange({ ...config, iconPadding });
  };
  const onChangeMotifPadding = (motifPadding: Config['motifPadding']) => {
    onChange({ ...config, motifPadding });
  };
  const onChangeType = (type: string) => onChange({ ...config, type });
  const onChangeNoBg = (event) =>
    onChange({ ...config, noBackground: event.target.checked });

  const iconsDr = <IconsDropdown value={config.icon} onChange={onChangeIcon} />;

  const letterControl = (
    <TextControl
      label="Character"
      value={config.letter || ''}
      onChange={onChangeLetter}
      maxLength={1}
      className="w-8 rounded-sm p-1 text-center"
    />
  );

  const typeControl = config.type === 'character' ? letterControl : iconsDr;

  return (
    <div
      className="flex h-full flex-col space-y-4 bg-gray-300
      p-6 text-sm"
    >
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
          id="no-background"
          value={config.noBackground}
          onChange={onChangeNoBg}
        />
        <label htmlFor="no-background" className="ml-2">
          No background
        </label>
      </div>
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
        label="Type"
        onChange={onChangeType}
        value={config.type}
        options={props.types}
      />

      {typeControl}
    </div>
  );
};

export default ToolForm;
