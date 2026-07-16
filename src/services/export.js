import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const getPixelRatio = () => {
  return Math.max(window.devicePixelRatio || 1, 2);
};

// Create high-quality PNG image from DOM element
export const createInvoiceImage = async (element) => {
  if (!element) {
    throw new Error("element not found.");
  }

  return await toPng(element, {
    pixelRatio: getPixelRatio(),
    cacheBust: true,
    backgroundColor: "#fff7ed",
    skipAutoScale: true,
  });
};

// Download invoice as PNG
export const exportInvoicePNG = async (element, fileName) => {
  const image = await createInvoiceImage(element);

  const link = document.createElement("a");

  link.download = `${fileName}.png`;

  link.href = image;

  link.click();
};

// Download invoice as PDF
export const exportInvoicePDF = async (element, fileName) => {
  const image = await createInvoiceImage(element);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5",
  });

  pdf.addImage(image, "PNG", 0, 0, 148, 210);

  pdf.save(`${fileName}.pdf`);
};