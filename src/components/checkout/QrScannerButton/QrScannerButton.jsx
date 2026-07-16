import { useState } from "react";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import QrScannerModal from "./QrScannerModal";

export default function QrScannerButton({
  onScan,
  disabled = false,
  children,
}) {

  const scanWithCamera = async () => {

    const scanner = new Html5Qrcode("qr-reader");

};

  const handleScan = async () => {
    
  };

  const [isOpenQrScanner , setIsOpenQrScanner] = useState(false)

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setIsOpenQrScanner(true)}
      className="                  
            border
            bg-orange-500
            rounded-2xl p-3
            flex gap-1
            items-center
            text-white
            hover:bg-orange-600
            hover:shadow-lg
            active:scale-90
            transition-all
            duration-300
            "
    >
      <MdOutlineQrCodeScanner className="h-5 w-5 text-white" />

      <span>{children}</span>

      <QrScannerModal isOpen={isOpenQrScanner} onClose={() => {setIsOpenQrScanner(false)}} onScan={onScan} />
    </button>
  );
}
