// Icons
import { MinusIcon } from "@heroicons/react/24/outline";


export default function InvoiceSummary({summary}) {
  return (
    <section className="">
      <div className="px-3">
        <SummaryRow label="Subtotal" value={`$${summary.subTotal.toFixed(2)}`} />

        <SummaryRow label="Discount" value={summary.discountAmount === 0 ? <MinusIcon className="w-4 h-3" /> : `- $${summary.discountAmount.toFixed(2)}`} />

        <SummaryRow label="Delivery" value={summary.deliveryFee === 0 ? <MinusIcon className="w-4 h-3" /> : `$${summary.deliveryFee.toFixed(2)}`} />

        <SummaryRow label="Tax" value={`$${summary.tax.toFixed(2)}`} />
      </div>

      <div className="mt-1 bg-orange-100 border border-orange-300 py-1.5 px-3 rounded-md">
        <SummaryRow label="Grand Total" value={`$${summary.finalPrice.toFixed(2)}`} isTotal />
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  isTotal = false,
}) {
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
            isTotal
              ? "text-[14px] font-semibold"
              : "text-[12px] text-stone-500"
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
