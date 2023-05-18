import React from "react";

interface Props {
  className?: string;
  onClick?:  React.MouseEventHandler;
  children: JSX.Element | JSX.Element[];
}

const Button: React.FC<Props> = ({ className, onClick, children }) => {
  return (
    <button onClick={onClick} 
      className={`flex items-center justify-center text-center px-5 py-1 text-white bg-glitch-box rounded ${className}`} >
      {children && children}
    </button>
  );
};

export default Button;
