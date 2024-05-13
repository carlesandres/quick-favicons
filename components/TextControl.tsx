import React from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface TextControlProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  onChange: (value: any, name: string) => void;
}

const TextControl = (props: TextControlProps) => {
  const { label, onChange, ...other } = props;
  const name = label.replace(/ /g, '').toLowerCase();

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.currentTarget;
    onChange(value, name);
  };

  return (
    <div className="grid gap-3">
      <Label className="" htmlFor={name}>{`${label}:`}</Label>
      <Input id={name} name={name} onChange={change} {...other} />
    </div>
  );
};

export default TextControl;
