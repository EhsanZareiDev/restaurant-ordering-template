import {useEffect } from "react";

// Icons
import { ChevronDownIcon, PrinterIcon } from "@heroicons/react/24/outline";
import { BiDownload } from "react-icons/bi";
import { BsFileImage, BsFilePdf } from "react-icons/bs";

export default function InvoiceToolbar({
  onPrint,
  onDownloadPNG,
  onDownloadPDF,
  exportState,
  isDropdownOpen,
  setIsDropdownOpen,
}) {

  // Close or Open Dropdown
  useEffect(() => {
    if (!isDropdownOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    window.addEventListener("keydown", handleEscClose);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleDownloadMenuToggle = (e) => {
    if (!isDropdownOpen) {
      e.stopPropagation();
      setIsDropdownOpen(true);
    }
  };
  return (
    <div className="flex gap-2 justify-center md:justify-normal z-40">
      {/* Print */}
      <button
        onClick={onPrint}
        className="
            inline-flex
            h-12
            items-center
            gap-2
            rounded-xl
            border
            border-orange-300
            bg-white
            px-6
            font-medium
            text-orange-500
            transition-all
            duration-200
            shadow-orange-200
            hover:border-orange-500
            hover:bg-orange-50
            hover:shadow-md
            active:scale-[0.98]
          "
      >
        <PrinterIcon className="w-5 h-5" />
        Print
      </button>

      {/* Download */}

      <div className="relative">
        <button
          className="
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-6
              font-medium
              text-white
              shadow-lg
              shadow-orange-500/20
              transition-all
              duration-200
              hover:bg-orange-600
              hover:shadow-orange-500/30
              active:scale-[0.98]
            "
          onClick={handleDownloadMenuToggle}
        >
          <BiDownload className="w-5 h-5" />
          Download
          <ChevronDownIcon className="w-3 h-3" />
        </button>

        <div
          className={`
              mt-3
              w-48
              rounded-2xl
              border
              border-stone-200
              bg-white
              p-2
              shadow-xl
              absolute
              outline-none
              z-50
              ${isDropdownOpen ? "block" : "hidden"}
            `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* DownloadPDF */}
          <button
            onClick={onDownloadPDF}
            className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-stone-700
                  transition-colors
                  hover:bg-orange-50
                "
            disabled={exportState.loading}
          >
            <BsFilePdf className="w-5 h-5" />
            Download PDF
          </button>

          {/* DownloadPNG */}
          <button
            onClick={onDownloadPNG}
            className="
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-stone-700
                  transition-colors
                  hover:bg-orange-50
                "
            disabled={exportState.loading}
          >
            <BsFileImage className="w-5 h-5" />
            Download PNG
          </button>
        </div>
      </div>
    </div>
  );
}
