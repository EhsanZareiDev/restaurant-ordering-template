import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

import Button from "../../common/Button";
import Modal from "../../common/Modal/Modal";
import LoadingSpinner from "./LoadingSpinner";
import QrOverlay from "./QrOverlay";
import { BiCameraOff } from "react-icons/bi";
import { FiRepeat } from "react-icons/fi";
import { IoWarningOutline } from "react-icons/io5";

export default function QrScannerModal({ isOpen, onClose, onScan }) {
  const scannerRef = useRef(null);
  const permissionCameraRef = useRef(null);

  const scannedRef = useRef(false);
  const fileInputRef = useRef(null);

  const [cameraError, setCameraError] = useState(null);
  const [imageScanError, setImageScanError] = useState("");
  const [isScannerLoading, setIsScannerLoading] = useState(false);

  // Listen for camera permission changes and handle revocation
  const watchCameraPermission = async () => {
    if (!isOpen) return;
    if (!navigator.permissions) return;

    try {
      const permission = await navigator.permissions.query({
        name: "camera",
      });

      permissionCameraRef.current = permission;

      permission.onchange = async () => {
        if (permission.state === "denied") {
          await stopScanner();

          setCameraError({
            name: "NotAllowedError",
          });
        }
      };
    } catch (error) {
      console.warn("Permission API:", error);
    }
  };

  // Initialize camera scanner
  const startScanner = async () => {
    if (scannerRef.current) return;

    setCameraError(null);
    setIsScannerLoading(true);

    scannedRef.current = false;

    try {
      scannerRef.current = new Html5Qrcode("qr-reader");

      await scannerRef.current.start(
        {
          facingMode: "environment",
        },

        {
          fps: 10,

          qrbox: {
            width: 250,
            height: 250,
          },
        },

        async (decodedText) => {
          if (scannedRef.current) return;

          scannedRef.current = true;

          await stopScanner();

          await onScan(decodedText);

          onClose();
        },

        // Ignore scan errors
        () => {},
      );
    } catch (error) {
      console.error("Start Scanner Error :", error);
      setCameraError(error);

      // Reset failed scanner instance
      if (scannerRef.current) {
        try {
          await scannerRef.current.clear();
        } catch {}

        scannerRef.current = null;
      }
    } finally {
      setIsScannerLoading(false);
    }
  };

  // Stop and destroy scanner instance
  const stopScanner = async () => {
    const scanner = scannerRef.current;

    if (!scanner) return;

    scannerRef.current = null;

    scannedRef.current = false;

    try {
      await scanner.stop();
    } catch (error) {
      console.warn("Scanner Stop :", error);
    }

    try {
      await scanner.clear();
    } catch (error) {
      console.warn("Scanner Clear :", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setCameraError(null);
      setImageScanError("");
      void startScanner();
      void watchCameraPermission();
    } else {
      void stopScanner();
    }

    return () => {
      if (permissionCameraRef.current) {
        permissionCameraRef.current.onchange = null;
      }
      void stopScanner();
    };
  }, [isOpen]);

  // Decode QR code from uploaded image
  const handleImageScan = async (e) => {
    setImageScanError("");

    const file = e.target.files[0];

    if (!file) return;
    e.target.value = "";

    await stopScanner();
    const scanner = new Html5Qrcode("image-reader");

    try {
      const decodedText = await scanner.scanFile(file, true);
      await onScan(decodedText);
      onClose();
    } catch (error) {
      console.error("Image Scan Error:", error);
      setImageScanError(
        "QR code could not be detected. Please upload a clearer image.",
      );

      void startScanner();
    } finally {
      try {
        await scanner.clear();
      } catch (error) {
        console.warn("Image Scan Error:", error);
      }
    }
  };

  // Map camera-related errors to a unified structure for UI handling
  const normalizeCameraError = (error) => {
    const message = error?.message || "";

    if (message.includes("NotAllowedError")) {
      return {
        name: "NotAllowedError",
        message,
      };
    }

    if (message.includes("NotFoundError")) {
      return {
        name: "NotFoundError",
        message,
      };
    }

    if (message.includes("NotReadableError")) {
      return {
        name: "NotReadableError",
        message,
      };
    }

    return {
      name: error?.name || "UnknownError",
      message,
    };
  };

  // Generate user-friendly messages for camera-related errors
  const getCameraErrorMessage = () => {
    if (!cameraError) return null;

    switch (normalizeCameraError(cameraError)) {
      case "NotAllowedError":
        return {
          title: "Camera Permission Denied",
          description:
            "Please allow camera access or upload a QR image instead.",
        };

      case "NotFoundError":
        return {
          title: "Camera Not Found",
          description: "No camera was detected on this device.",
        };

      case "NotReadableError":
        return {
          title: "Camera Busy",
          description:
            "Your camera is currently being used by another application.",
        };

      default:
        return {
          title: "Camera Error",
          description: "Unable to start the camera.",
        };
    }
  };
  const cameraMessage = getCameraErrorMessage();

  // Pause and resume the scanner when the page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isOpen) return;

      if (document.visibilityState === "hidden") {
        if (scannerRef.current) {
          void stopScanner();
        }
      }
      if (document.visibilityState === "visible") {
        if (!scannerRef.current) {
          if (!cameraError) {
            startScanner();
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isOpen]);

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
                    void startScanner();
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
