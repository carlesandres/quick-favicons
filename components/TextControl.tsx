import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';

interface TextControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  onChange: (value: any, name: string) => void;
  outerClassName?: string;
}

const TextControl = (props: TextControlProps) => {
  const { label, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    onChange(value, name);
  };

  return (
    <div className={cn(`grid gap-3`, props.outerClassName)}>
      <Label className="" htmlFor={name}>{`${label}:`}</Label>
      <Input id={name} name={name} onChange={change} {...other} />
    </div>
  );
};

export default TextControl;
