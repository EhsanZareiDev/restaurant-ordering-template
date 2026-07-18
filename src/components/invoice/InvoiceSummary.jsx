// Utils
import { formatPrice } from "../../utils/formatPrice";

export default function InvoiceSummary({ summary }) {
  return (
    <section className="">
      <div className="px-3">
        <SummaryRow
          label="Subtotal"
          value={formatPrice({
            price: summary.subTotal,
            isMinus: true,
            isSmall: true,
          })}
        />

        <SummaryRow
          label="Discount"
          value={formatPrice({
            price: summary.discountAmount,
            isMinus: true,
            isSmall: true,
          })}
        />

        <SummaryRow
          label="Delivery"
          value={formatPrice({
            price: summary.deliveryFee,
            isMinus: true,
            isSmall: true,
          })}
        />

        <SummaryRow
          label="Tax"
          value={formatPrice({
            price: summary.tax,
            isMinus: true,
            isSmall: true,
          })}
        />
      </div>

      <div className="mt-1 bg-orange-100 border border-orange-300 py-1.5 px-3 rounded-md">
        <SummaryRow
          label="Grand Total"
          value={formatPrice({
            price: summary.finalPrice,
            isMinus: true,
            isSmall: true,
          })}
          isTotal
        />
      </div>
    </section>
  );
}

function SummaryRow({ label, value, isTotal = false }) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-6

        ${isTotal ? "pt-0" : "py-0.5"}
      `}
    >
      <span
        className={`
          ${
            isTotal ? "text-[14px] font-semibold" : "text-[12px] text-stone-500"
          }
        `}
      >
        {label}
      </span>

      <span
        className={`
          ${
            isTotal
              ? "text-[16px] font-bold text-orange-500"
              : "text-[13px] font-medium"
          }
        `}
      >
        {value}
      </span>
    </div>
  );
}
