import { useState } from 'react';
import icons from 'components/icons.json';
import { cn } from '@/lib/utils';
import { PopoverTrigger, PopoverContent, Popover } from './ui/popover';
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from 'cmdk';
import { ChevronsUpDown, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';

interface IconsDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const IconsDropdown = (props: IconsDropdownProps) => {
  const { value = '', onChange } = props;
  const [open, setOpen] = useState(false);

  const fullIcons = icons.icons
    .map((icon: string) => ({
      value: icon,
      label: icon,
    }))
    .filter((x) => x.value);

  if (!fullIcons.length) {
    return null;
  }

  const svgList = fullIcons.map((icon) => {
    return (
      <CommandItem
        key={icon.value}
        value={icon.value}
        onSelect={(currentValue) => {
          onChange(currentValue === value ? '' : currentValue);
          setOpen(false);
        }}
        className="flex cursor-pointer items-center px-2 py-1 text-sm hover:bg-gray-200"
      >
        <Check
          className={cn(
            'mr-2 h-4 w-4',
            value === icon.value ? 'opacity-100' : 'opacity-0',
          )}
        />
        {icon.label}
      </CommandItem>
    );
  });

  const icon = value
    ? fullIcons.find((icon) => icon.value === value)?.label
    : 'Select icon...';

  return (
    <div className="flex w-full flex-col gap-3">
      <Label>Icon:</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {icon}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search icon..." />
            <CommandList>
              <CommandEmpty>No icon found.</CommandEmpty>
              <CommandGroup>{svgList}</CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconsDropdown;
