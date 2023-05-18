import React, { useState,useEffect, useRef } from 'react';
// import listenForOutsideClick from "./listenForOutsideClicks.js";
import  "./ProductCategoryDropDown.css";

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


const Dropdown = ({title , DropdownFunc , items , multiSelect = false }) => {

  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [selectedText, setSelectedText] = useState(title);  
  const [listening, setListening] = useState(false);

  

  useEffect(() => {
    // console.log(title);
    if(title !== "Select Category"){
      const itm = items.filter(item => item.value === title);
      const sitm =itm[0];
      // setSelection(sitm);    
      setSelectedText(sitm?.value);
      DropdownFunc(sitm);
    }

  },[items, title]);

  const toggle = () => setOpen(!open);

  function handleOnClick(item) {
    if (!selection.some(current => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(current => current.id !== item.id );
      setSelection([...selectionAfterRemoval]);
    }
    setSelectedText(item.value);

    DropdownFunc(item)
  }

  useEffect(listenForOutsideClick(
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
          <p className="dd-header__title--bold">{selectedText.value ? selectedText.value : selectedText}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;