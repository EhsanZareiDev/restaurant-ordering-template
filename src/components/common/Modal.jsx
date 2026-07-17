import { useEffect } from "react";
// Third Party Libraries
import { createPortal } from "react-dom";
// Icons
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, size='xl' , children , showHeader = true }) {
  
  // Close Modal
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




function ModalHeader({title , onClose}) {
    return (
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-stone-800">{title}</h2>
            </div>

            <button
              onClick={onClose}
              className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-stone-500
            transition-all
            duration-200
            hover:bg-orange-100
            hover:text-orange-600
        "
            >
              <FiX size={20} />
            </button>
        </div>
    )
}