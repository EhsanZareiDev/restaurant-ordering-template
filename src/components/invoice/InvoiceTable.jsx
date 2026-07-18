// Utils
import { formatPrice } from "../../utils/formatPrice";

export default function InvoiceTable({ cart }) {
  return (
    <section className="rounded-lg border border-orange-200">
      {/* Table Header */}

      <div
        className="
          grid
          grid-cols-[3fr_1.2fr_.8fr_1.2fr]
          border-b
          border-stone-300
          pb-3
          text-[12px]
          uppercase
          text-white
          bg-orange-500
        py-2 px-3
        rounded-t-lg
        "
      >
        <span>Product</span>

        <span className="text-center">Unit Price</span>

        <span className="text-center">Qty</span>

        <span className="text-right">Total</span>
      </div>

      {/* Rows */}

      <div className="grid gap-[1px] bg-orange-200 rounded-b-lg">
        {cart.map((item, index) => (
          <InvoiceRow
            key={index}
            item={item}
            className={index + 1 === cart.length ? "rounded-b-lg" : ""}
          />
        ))}
      </div>
    </section>
  );
}

function InvoiceRow({ className , item }) {
  return (
    <div
      className={`
        grid
        grid-cols-[3fr_1.2fr_.8fr_1.2fr]
        items-center
        bg-orange-50
        py-2
        px-3
        ${className}
      `}
    >
      {/* Product */}

      <div>
        <h4
          className="
            text-[13px]
            font-semibold
            text-stone-900
          "
        >
          {item.name}
        </h4>

        <p
          className="
            text-[10px]
            text-stone-500
          "
        >
          {item.category}
        </p>
      </div>

      {/* Unit Price */}

      <p
        className="
          text-center
          text-[13px]
          text-stone-800
        "
      >
        {formatPrice({price: item.price, isMinus: false})}
      </p>

      {/* Quantity */}

      <p
        className="
          text-center
          text-[13px]
          font-medium
          text-stone-800
        "
      >
        ×{item.quantity}
      </p>

      {/* Total */}

      <p
        className="
          text-right
          text-[14px]
          font-semibold
          text-stone-800
        "
      >
        {formatPrice({price: item.price * item.quantity, isMinus: false})}
      </p>
    </div>
  );
}
