import { Html5Qrcode } from "html5-qrcode";


// Initialize camera scanner
export async function startScanner({
  elementId,
  scannerRef,
  scannedRef,
  onSuccess,
  onError,
  onLoadingChange,
}) {
  if (scannerRef.current) return;

  scannedRef.current = false;
  onLoadingChange?.(true);

  try {
    const scanner = new Html5Qrcode(elementId);
    scannerRef.current = scanner;

    await scanner.start(
      { facingMode: "environment" },
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

        await stopScanner(scannerRef, scannedRef);

        await onSuccess(decodedText);
      },
      () => {}
    );
  } catch (error) {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch(err) {
        console.error(err);
      }

      scannerRef.current = null;
    }

    onError?.(error);
  } finally {
    onLoadingChange?.(false);
  }
}


// Stop and destroy scanner instance
export async function stopScanner(scannerRef, scannedRef) {
  const scanner = scannerRef.current;

  if (!scanner) return;

  scannerRef.current = null;
  scannedRef.current = false;

  try {
    await scanner.stop();
  } catch (error) {
    console.warn("Scanner Stop:", error);
  }

  try {
    await scanner.clear();
  } catch (error) {
    console.warn("Scanner Clear:", error);
  }
}