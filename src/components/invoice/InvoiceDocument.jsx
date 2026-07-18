import { forwardRef } from "react";
// Constants
import { DELIVERY_TYPE } from "../../constants/checkout";
// Components
import CustomerSection from "./CustomerSection";
import DeliverySection from "./DeliverySection";
import InvoiceFooter from "./InvoiceFooter";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceMeta from "./InvoiceMeta";
import InvoiceSummary from "./InvoiceSummary";
import InvoiceTable from "./InvoiceTable";
import OrderNote from "./OrderNote";
import TableSection from "./TableSection";

const InvoiceDocument = forwardRef(({ order }, ref) => {
  return (
    <div
      ref={ref}
      id="invoiceDocument"
      className="
        relative
        w-[546px]
        min-h-[773.5px]
        h-auto
        rounded-3xl
        bg-orange-50
        px-8
        py-6
        shadow-xl
        print:rounded-none
        print:shadow-none
        shrink-0
        "
    >
      {/* Header */}

      <InvoiceHeader invoiceNumber={order.invoiceNumber} />

      {/* Invoice Meta */}

      <InvoiceMeta
        createdAt={order.createdAt}
        paymentMethod={order.payment.method}
      />

      {/* Customer + Delivery or Table */}

      <div className="flex justify-between items-center mt-4 mb-5 ">
        <CustomerSection
          name={order.customer.name}
          phone={order.customer.phone}
          email={order.customer.email}
        />
        <div className="w-[1.5px] h-[80px] bg-orange-100 flex-shirink-0"></div>

        {order.deliveryType === DELIVERY_TYPE.RESTAURANT ? (
          <TableSection tableCode={order.customer.table} />
        ) : (
          <DeliverySection
            address={order.customer.address}
            postalCode={order.customer.postalCode}
            addressTitle={order.customer.addressTitle}
          />
        )}
      </div>

      {/* Products */}

      <InvoiceTable cart={order.cart} />

      {/* Note + Summary */}

      <div className="mt-2 grid grid-cols-[1fr_auto] gap-6">
        <OrderNote note={order.customer.description} />
        <InvoiceSummary summary={order.summary} />
      </div>

      {/* Footer */}

      <InvoiceFooter />
    </div>
  );
});

export default InvoiceDocument;
