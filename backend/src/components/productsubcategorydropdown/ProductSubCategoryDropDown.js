import React, { useState,useEffect, useRef } from 'react';
// import listenForOutsideClick from "./listenForOutsideClicks.js";
import  "./ProductSubCategoryDropDown.css";

const listenForOutsideClick = (listening, setListening, menuRef, setIsOpen) => {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef.current==null || menuRef.current.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  }
}


const Dropsubdown = ({title , DropsubdownFunc , items , multiSelect = false }) => {

  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [selectedText, setSelectedText] = useState(title);  
  const [subcat, setSubcat] = useState(items);  
  const [listening, setListening] = useState(false);

  const toggle = () => setOpen(!open);

  useEffect(() => {
    
    if(title !== "Select Sub Category" && subcat.length>0){
      
        const itm = subcat.filter(item => item === title);
        
        const sitm =itm[0];
        setSelectedText(sitm);
        DropsubdownFunc(sitm);
      
    }else{
      setSelectedText(title);
    }
  },[subcat, title]);

  function handleOnClick(item) {
    if (!selection.some(current => current === item)) {
      if (!multiSelect) {
        setSelection([item]);
        // setSelectedText(item);
      } else if (multiSelect) {
        setSelection([...selection, item]);
        // setSelectedText(item);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(current => current !== item );
      setSelection([...selectionAfterRemoval]);
      // setSelectedText(item);
    }
    setSelectedText(item.value);

    DropsubdownFunc(item);
    
  }

  useEffect(() => listenForOutsideClick(
    listening,
    setListening,
    menuRef,
    setOpen,
  ));

  return (
    <div className="dd-wrapper mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
        ref={menuRef}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{selectedText}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropsubdown;