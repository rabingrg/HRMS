import React from 'react';
interface props {
  text: string;
  children: React.ReactNode;
}
export const DropDown = ({ children, text }: props) => {
  return (
    <div>
      <div>
        <label>{text}</label>

        <span>{children}</span>
      </div>
    </div>
  );
};
