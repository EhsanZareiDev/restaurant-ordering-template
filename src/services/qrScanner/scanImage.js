import { Html5Qrcode } from "html5-qrcode";

export async function scanImage(file) {
  const scanner = new Html5Qrcode("image-reader");

  try {
    return await scanner.scanFile(file, true);
  } finally {
    try {
      await scanner.clear();
    } catch(err) {
        console.warn("Image Scan Error:", err);
    }
  }
}