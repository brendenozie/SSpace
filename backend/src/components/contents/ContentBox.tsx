import React from "react";
import Search from "../Search";
import Button from "../Button";

interface Props {
  name: string;
  showSearch?: boolean;
  showButton?: boolean;
  onClick?:  React.MouseEventHandler;
  children?: JSX.Element[] | JSX.Element;  
}

const ContentBox: React.FC<Props> = ({
  name,
  showSearch = false,
  showButton = false,
  onClick,
  children,
}) => {
  return (
    <div className="mt-5 bg-glitch-bar relative rounded">
      <div className="flex justify-between items-center bg-glitch-bar px-5 py-4 text-white font-semibold text-base">
        <h2>{name && name}</h2>
        {showSearch && (
          <div className="ml-1">
            <Search />
          </div>
        )}
        {showButton && (
          <div className="ml-2">
            <Button className="hover:bg-glitch-orange" onClick={onClick}>
              <span className="material-icons text-lg">add</span>
              <span className="ml-2">Add</span>
            </Button>
        </div>
        )}


      </div>
      {children && children}
    </div>
  );
};

export default ContentBox;
