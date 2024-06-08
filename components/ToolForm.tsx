import Dropdown from 'components/Dropdown';
import IconsDropdown from 'components/IconsDropdown';
import TextControl from 'components/TextControl';
import { Config } from '@/pages/index';
import { GradientPicker } from './GradientPicker';
import { Label } from './ui/label';

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
  const onChangeNoBg = (event: React.ChangeEvent<HTMLInputElement>) =>
    onChange({ ...config, noBackground: event.target.checked });

  const iconsDr = <IconsDropdown value={config.icon} onChange={onChangeIcon} />;

  const letterControl = (
    <TextControl
      label="Character"
      value={config.letter || ''}
      onChange={onChangeLetter}
      maxLength={1}
      className="w-8 rounded-sm p-1 text-center"
      outerClassName="flex gap-2 items-center"
    />
  );

  const typeControl = config.type === 'character' ? letterControl : iconsDr;

  return (
    <div
      className="flex h-full flex-col space-y-4 bg-gray-300
      p-6 text-sm"
    >
      <div className="flex flex-col gap-2">
        <Label>FG color</Label>
        <GradientPicker
          className="w-full truncate"
          background={config.fgcolor}
          setBackground={onChangeFGColor}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label>BG color</Label>
        <GradientPicker
          className="w-full truncate"
          background={config.color}
          setBackground={onChangeBGColor}
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="no-background"
          checked={config.noBackground}
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
        disabled={config.noBackground}
      />
      <TextControl
        label="Outer Padding %"
        type="number"
        min="0"
        max="100"
        step="5"
        value={config.iconPadding}
        onChange={onChangeIconPadding}
        disabled={config.noBackground}
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
        label="Motif Type"
        onChange={onChangeType}
        value={config.type}
        options={props.types}
      />

      {typeControl}
    </div>
  );
};

export default ToolForm;
