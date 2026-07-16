import { BsReceipt } from "react-icons/bs";
import InvoiceToolbar from "../components/orderDetails/InvoiceToolbar";
import OrderProgress from "../components/orderDetails/OrderProgress/OrderProgress";
import PageContainer from "../layouts/PageContainer";
import PageHeader from "../layouts/PageHeader";
import InvoiceDocument from "../components/invoice/InvoiceDocument";
import { useMemo, useRef, useState } from "react";

import { exportInvoicePNG, exportInvoicePDF } from "../services/export";
import { STORAGE_KEYS } from "../constants/storageKeys";
import PageFooter from "../layouts/PageFooter";
import { loadStorage } from "../services/storage";
import { useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  const [exportState, setExportState] = useState({
    loading: false,
    type: null, // "png" | "pdf"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    try {
      setExportState({
        loading: true,
        type: "png",
      });

      await exportInvoicePNG(invoiceRef.current, order.invoiceNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setExportState({
        loading: false,
        type: null,
      });
    }
  };

  const handleDownloadPDF = async () => {
    try {
      setExportState({
        loading: true,
        type: "pdf",
      });

      await exportInvoicePDF(invoiceRef.current, order.invoiceNumber);
    } catch (error) {
      console.error(error);
    } finally {
      setExportState({
        loading: false,
        type: null,
      });
    }
  };

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

  if (!order) {
    navigate("/checkout");
}

  const formatDateTimeForAside = () => {
    const d = new Date(order.createdAt);

    const formattedDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);

    const formattedTime = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);

    return { formattedDate, formattedTime };
  };
  return (
    <main className="min-h-screen">
      <PageHeader title="Continue Shopping" to="/" />
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
              onDownloadPNG={handleDownloadPNG}
              onDownloadPDF={handleDownloadPDF}
              exportState={exportState}
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
                {formatDateTimeForAside().formattedDate} •{" "}
                {formatDateTimeForAside().formattedTime}
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
