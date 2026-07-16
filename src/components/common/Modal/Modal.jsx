import { useEffect, useState } from "react";
import ModalHeader from "./ModalHeader";
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onClose, title, size='xl' , children , showHeader = true }) {
  useEffect(() => {
  if (!isOpen) return;

  document.body.style.overflow = "hidden";

  const handleEscClose = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  window.addEventListener("keydown", handleEscClose);

  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleEscClose);
  };
}, [isOpen, onClose]);
  

const sizes = {
  sm: "max-w-sm" ,
  md: "max-w-md" ,
  lg: "max-w-lg" ,
  xl: "max-w-xl" ,
}


  if (!isOpen) return null;
  


  return  createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center"
        onClick={onClose}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            relative
            w-full
            ${sizes[size]}
            rounded-3xl
            bg-white
            shadow-2xl
            overflow-hidden
            `}
        >
          
          {showHeader && <ModalHeader title={title} onClose={onClose} />}
          
          

          {/* Body */}

          <div className="p-6">{children}</div>

        </div>
      </div>
    </div>
    ,document.getElementById("modal-root")
  );
}
