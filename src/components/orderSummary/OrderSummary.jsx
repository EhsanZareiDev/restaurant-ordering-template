// Icons
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
// Utils
import { formatPrice } from "../../utils/formatPrice";
// Components
import CouponInput from "../cart/CouponInput";
import SummaryDetail from "./SummaryDetail";
import Button from "../common/Button";

export default function OrderSummary({
  orderSummary,
  couponsAction,
  showCoupon,
  submitButtonText,
  handleSubmitButton,
}) {
  const { subTotal, tax, deliveryFee, discountAmount, finalPrice } =
    orderSummary;

  const hasDiscount = discountAmount > 0;
  return (
    <div
      className="
        rounded-3xl
        border
        border-stone-200
        bg-white
        p-6
        transition-all
        duration-300
        lg:sticky
        lg:top-8
      "
    >
      {/* Header */}

      <div className="flex mb-5 items-center gap-3">
        <div
          className="
            flex
            items-center
            justify-center
            rounded-2xl
            text-xl
          "
        >
          <ShoppingBagIcon className="w-8 h-8" />
        </div>

        <div>
          <h2
            className="
              text-xl
              font-bold
              text-stone-900
            "
          >
            Order Summary.
          </h2>
        </div>
      </div>

      {/* Summary Items  */}

      <div className="space-y-1">
        <SummaryDetail>
          <span className="text-stone-500">Subtotal</span>

          <span className=" text-stone-900 text-lg">
            {formatPrice({
              price: subTotal,
              isMinus: false,
            })}
          </span>
        </SummaryDetail>

        <SummaryDetail>
          <span className="text-stone-500">Delivery</span>

          <span className=" text-stone-900 text-lg">
            {formatPrice({ price: deliveryFee })}
          </span>
        </SummaryDetail>

        <SummaryDetail>
          <span className="text-stone-500">Tax</span>

          <span className=" text-stone-900 text-lg">
            {formatPrice({ price: tax })}
          </span>
        </SummaryDetail>

        <SummaryDetail>
          <span
            className={`text-lg  ${!hasDiscount ? "text-stone-500" : "text-green-600"}`}
          >
            Discount
          </span>

          <span
            className={`text-lg  ${!hasDiscount ? "text-stone-900" : "text-green-600"}`}
          >
            {hasDiscount ? "-" : ""} {formatPrice({ price: discountAmount })}
          </span>
        </SummaryDetail>
      </div>

      <div className="my-6 h-px bg-stone-200" />
      {/* Total */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xl
              text-stone-600
              font-bold
            "
          >
            Total
          </p>
        </div>

        <h2
          className="
            text-3xl
            font-extrabold
            text-orange-500
          "
        >
          {finalPrice === 0 ? "Free" : formatPrice({ price: finalPrice })}
        </h2>
      </div>

      {/* Coupon */}

      {showCoupon && <CouponInput couponsAction={couponsAction} />}

      {/* Checkout Button */}

      <Button onClick={handleSubmitButton}>
        {submitButtonText} <ArrowLongRightIcon className="w-8 h-auto" />
      </Button>
    </div>
  );
}
