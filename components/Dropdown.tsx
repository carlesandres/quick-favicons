import { Label } from './ui/label';
import {
  SelectItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from './ui/select';

interface DropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const Dropdown = (props: DropdownProps) => {
  const { label, value, onChange } = props;
  const name = label.replace(/ /g, '').toLowerCase();
  const renderOptions = props.options.map((op) => {
    return (
      <SelectItem key={op} value={op}>
        {op}
      </SelectItem>
    );
  });

  return (
    <div className="flex w-full flex-col gap-3">
      <Label className="" htmlFor={name}>{`${label}:`}</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>{renderOptions}</SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
