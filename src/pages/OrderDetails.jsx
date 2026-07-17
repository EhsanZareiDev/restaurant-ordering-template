import { useEffect, useMemo, useRef, useState } from "react";
// Third Party Libraries
import { useNavigate } from "react-router-dom";
// Icons
import { BsReceipt } from "react-icons/bs";
// Constants
import { STORAGE_KEYS } from "../constants/storageKeys";
// Services
import { loadStorage } from "../services/storageService";
import { exportInvoicePNG, exportInvoicePDF } from "../services/exportService";
// Utils
import { formatDateTimeForAside } from "../utils/formatDate";
// Layouts
import PageHeader from "../layouts/PageHeader";
import PageContainer from "../layouts/PageContainer";
import PageFooter from "../layouts/PageFooter";
// Components
import InvoiceToolbar from "../components/orderDetails/InvoiceToolbar";
import OrderProgress from "../components/orderDetails/OrderProgress/OrderProgress";
import InvoiceDocument from "../components/invoice/InvoiceDocument";

export default function OrderDetails() {
  const invoiceRef = useRef(null);
  const navigate = useNavigate();

  //For Export Loading
  const [exportState, setExportState] = useState({
    loading: false,
    type: null, // "png" | "pdf"
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  //Loading Order
  const order = useMemo(() => {
    try {
      const storedOrder = loadStorage(STORAGE_KEYS.ORDER);

      if (!storedOrder) return null;

      return {
        ...storedOrder,
        createdAt: new Date(storedOrder.createdAt),
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!order) {
      navigate("/checkout", { replace: true });
    }
  }, [order, navigate]);

  // Format Date & Time For Aside
  const { formattedDate, formattedTime } = formatDateTimeForAside(
    order.createdAt,
  );

  // Export Handler
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async (type) => {
    try {
      setExportState({
        loading: true,
        type,
      });

      if (type === "png") {
        await exportInvoicePNG(invoiceRef.current, order.invoiceNumber);
      } else if (type === "pdf") {
        await exportInvoicePDF(invoiceRef.current, order.invoiceNumber);
      } else {
        console.error("handleDownload: Unknown type!");
      }
    } finally {
      setExportState({
        loading: false,
        type: null,
      });
      
      setIsDropdownOpen(false);
    }
  };

  return (
    <main className="min-h-screen">
      <PageHeader title="Return to Menu" to="/" />
      <PageContainer>
        <div className="">
          <div
            className="
          mb-6 
          flex 
          md:justify-between
          gap-4 md:gap-6 
          flex-col md:flex-row
          print:hidden
          "
          >
            <div>
              <h1 className="text-3xl lg:text-4xl text-center md:text-left font-bold text-stone-900">
                Order Details.
              </h1>
              <p className="text-stone-500 mt-1 text-center md:text-left">
                Track your order & review, print or download your invoice.
              </p>
            </div>

            <InvoiceToolbar
              onPrint={handlePrint}
              onDownloadPNG={() => handleDownload("png")}
              onDownloadPDF={() => handleDownload("pdf")}
              exportState={exportState}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </div>
          <div
            className="origin-top
            zoom-[0.65]
            sm:zoom-[0.75]
            md:zoom-[0.85]
            lg:zoom-100
            flex justify-center
            "
          >
            <InvoiceDocument ref={invoiceRef} order={order} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start print:hidden">
          <div
            className="
    flex
    justify-between
    rounded-3xl
    border
    border-stone-200
    bg-gray-50
    px-6
    py-5
    mb-4
  "
          >
            <div>
              <p className="font-semibold text-gray-700 flex gap-2 items-center">
                <BsReceipt className="w-h h-5" />
                Order Nomber
              </p>

              <h3 className="text-2xl font-bold tracking-wide text-orange-500">
                #{order.orderId}
              </h3>
            </div>

            <div className="">
              <p className="mt-1 text-sm text-stone-500">
                {formattedDate} • {formattedTime}
              </p>
            </div>
          </div>
          <OrderProgress
            activeStep={order.status}
            deliveryType={order.deliveryType}
          />
        </aside>
      </PageContainer>
      <PageFooter />
    </main>
  );
}
