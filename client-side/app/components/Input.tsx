import React from 'react';

interface Props {
  type: string;
  name: string;
  placeholder: string;
  handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<Props> = ({ type, name, placeholder, handleUsernameChange }) => {
  return name === 'First' || name === 'Last' ? (
    <input
      className="inline-flex items-center self-stretch h-12 max-w-[170px] rounded text-lg border px-3 border-[solid]"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => handleUsernameChange(e)}
    />
  ) : (
    <input
      className="inline-flex items-center self-stretch h-12 rounded text-lg border px-3 border-[solid]"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => handleUsernameChange(e)}
    />
  );
};

export default Input;
