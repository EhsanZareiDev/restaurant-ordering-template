import { useCallback, useEffect, useRef, useState } from "react";
// Icons
import { BiCameraOff } from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";
// Services
import {
  startScanner,
  stopScanner,
} from "../../../services/qrScanner/qrScanner";
import { scanImage } from "../../../services/qrScanner/scanImage";
// Utils
import { watchCameraPermission } from "../../../utils/qrScanner/cameraPermission";
import { getCameraErrorMessage } from "../../../utils/qrScanner/cameraErrors";
// Components
import Button from "../../common/Button";
import Modal from "../../common/Modal";
import LoadingSpinner from "./LoadingSpinner";
import QrOverlay from "./QrOverlay";


export default function QrScannerModal({ isOpen, onClose, onScan }) {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);
  const fileInputRef = useRef(null);

  const [cameraError, setCameraError] = useState(null);
  const [imageScanError, setImageScanError] = useState("");
  const [isScannerLoading, setIsScannerLoading] = useState(false);

  const cameraMessage = getCameraErrorMessage(cameraError);

  // Start scanner
  const runScanner = useCallback(async () => {
    await startScanner({
      elementId: "qr-reader",
      scannerRef,
      scannedRef,
      onSuccess: async (decodedText) => {
        await onScan(decodedText);
        onClose();
      },
      onError: setCameraError,
      onLoadingChange: setIsScannerLoading,
    });
  },[onScan, onClose])

useEffect(() => {
  let cleanupPermission = () => {};

  const init = async () => {
    if (isOpen) {
      setCameraError(null);
      setImageScanError("");

      await runScanner();

      cleanupPermission = await watchCameraPermission({
        stopScanner: () => stopScanner(scannerRef, scannedRef),
        onDenied: () => {
          setCameraError({
            name: "NotAllowedError",
          });
        },
      });
    } else {
      await stopScanner(scannerRef, scannedRef);
    }
  };

  init();

  return () => {
    cleanupPermission();

    void stopScanner(scannerRef, scannedRef);
  };
}, [isOpen]);

    // Pause and resume the scanner when the page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isOpen) return;

      if (document.visibilityState === "hidden") {
        if (scannerRef.current) {
          void stopScanner(scannerRef, scannedRef);
        }
      }
      if (document.visibilityState === "visible") {
        if (!scannerRef.current) {
          if (!cameraError) {
            runScanner();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };

  }, [isOpen, cameraError]);

  // Decode QR code from uploaded image
  const handleImageScan = async (e) => {
    setImageScanError("");

    const file = e.target.files[0];

    if (!file) return;
    e.target.value = "";

    await stopScanner(scannerRef, scannedRef);

    try {
      const decodedText = await scanImage(file);
      await onScan(decodedText);
      onClose();
    } catch (error) {
      console.error(error);
      setImageScanError(
        "QR code could not be detected. Please upload a clearer image.",
      );

      await runScanner();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Scan QR Code" size="md">
      <div className="flex flex-col items-center">
        <p className="mb-6 text-center text-stone-500">
          Place the QR code inside the frame.
        </p>

        <div className="relative flex justify-center">
          <div id="image-reader" className="hidden" />
          <div
            id="qr-reader"
            className="
          relative 
            h-[340px]
            w-[340px]
            overflow-hidden
            rounded-2xl
            border-2
            border-dashed
            border-orange-300
            bg-stone-100
            flex
            items-center
        "
          />

          {isScannerLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : cameraError ? (
            <div
              className="
            absolute
            inset-0

            flex
            flex-col

            items-center
            justify-center

            rounded-2xl
            text-center
            p-6
        "
            >
              <div className="mb-4 text-5xl">
                <BiCameraOff className="w-10" />
              </div>

              <h3 className="text-xl font-semibold">{cameraMessage.title}</h3>

              <p className="mt-2 text-sm text-stone-500">
                {cameraMessage.description}
              </p>

              <div className="mt-10 flex gap-3">
                <button
                  className="text-orange-500 border border-orange-400 p-3 rounded-xl flex gap-2 items-center"
                  onClick={() => {
                    setCameraError(null);
                    void runScanner();
                  }}
                >
                  <FiRepeat className="w-5 h-5" /> Retry Camera
                </button>
              </div>
            </div>
          ) : (
            <QrOverlay />
          )}
        </div>

        {imageScanError && (
          <div
            className="
                mt-4
                w-full

                rounded-xl

                border
                border-orange-200

                bg-orange-50

                p-4
                flex gap-1 items-center
            "
          >
            <IoWarningOutline className="w-8 h-8 text-orange-600" />
            <p
              className="
                    text-sm
                    space-y-0
                    text-orange-700
                "
            >
              {imageScanError}
            </p>
          </div>
        )}

        <Button onClick={() => fileInputRef.current.click()}>
          Upload Image
        </Button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageScan}
        />
      </div>
    </Modal>
  );
}
