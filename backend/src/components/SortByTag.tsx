import React, { useContext } from "react";
import { SortListContext } from "../contexts/sortedOrderContext";

interface Props {
  tags: string[];
  defaultActiveIndex?: string;  
  onsetClick(activeTab: string): any;
}

const SortByTag: React.FC<Props> = ({ tags, defaultActiveIndex = "pending" , onsetClick}) => {
  
  return (
    <ul className="flex items-center overflow-x-auto">
      {tags &&
        tags.map((text, i) => (
          <li key={i} className="min-w-max" onClick={() => onsetClick(`${text.toLowerCase()}`)}>
            <button
              className={`px-4 py-2 text-base  text-white border-b-2 ${
                defaultActiveIndex.toLowerCase() === text.toLowerCase()
                  ? "border-b-glitch-orange bg-glitch-box font-semibold"
                  : "border-transparent"
              }`
            }
            >
              {text}
            </button>
          </li>
        ))}
    </ul>
  );
};

export default SortByTag;
