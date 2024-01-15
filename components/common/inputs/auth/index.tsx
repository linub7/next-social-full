import { ChangeEvent } from 'react';

interface Props {
  id: string;
  placeholder: string;
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CommonAuthInput = (props: Props) => {
  const { label, type, name, id, placeholder, value, onChange } = props;
  return (
    <div className="flex flex-col gap-1 w-full">
      <label>{label}</label>
      <input
        className="text-black p-3 border border-slate-700 rounded-lg"
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        required
        onChange={onChange}
      />
    </div>
  );
};

export default CommonAuthInput;
