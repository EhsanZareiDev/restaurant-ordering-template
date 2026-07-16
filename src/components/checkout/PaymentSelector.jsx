import {
  CreditCardIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";

export default function PaymentSelector({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="flex flex-col gap-2">

      <h3
        className="
          text-lg
          font-semibold
          text-stone-800
        "
      >
        Payment Method
      </h3>

      <div
        className="
          grid
          grid-cols-1
          gap-4

          sm:grid-cols-2
        "
      >
        <button
          type="button"
          onClick={() => setPaymentMethod("online")}
          className={`
            relative
            flex
            items-center
            gap-4

            rounded-2xl
            border

            px-5
            py-5

            text-left

            transition-all
            duration-300
            ${
              paymentMethod === "online"
                ? `
                  border-orange-500
                  bg-orange-50
                  shadow-lg
                  shadow-orange-200/60
                `
                : `
                  border-stone-200
                  bg-white

                  hover:border-orange-300
                  hover:bg-orange-50
                `
            }
          `}
        >
          <CreditCardIcon
            className={`
              h-7
              w-7

              ${
                paymentMethod === "online"
                  ? "text-orange-500"
                  : "text-stone-500"
              }
            `}
          />

          <div>
            <p
              className="
                font-semibold
                text-stone-900
              "
            >
              Online Payment
            </p>

            <span
              className="
                text-sm
                text-stone-500
              "
            >
              Pay securely using your bank card
            </span>

            <span className={`rounded-4xl w-6 h-6 border ${paymentMethod === "online" ? 'border-orange-500' : 'border-stone-300'} flex justify-center items-center absolute top-3 right-3`}>
                {paymentMethod === "online" && <span className="rounded-4xl w-4 h-4 bg-orange-500"></span>}
            </span>
          </div>
        </button>

                <button
          type="button"
          onClick={() => setPaymentMethod("cash")}
          className={`
            relative
            flex
            items-center
            gap-4

            rounded-2xl
            border

            px-5
            py-5

            text-left

            transition-all
            duration-300

            ${
              paymentMethod === "cash"
                ? `
                  border-orange-500
                  bg-orange-50
                  shadow-lg
                  shadow-orange-200/60
                `
                : `
                  border-stone-200
                  bg-white

                  hover:border-orange-300
                  hover:bg-orange-50
                `
            }
          `}
        >
          <BanknotesIcon
            className={`
              h-7
              w-7

              ${
                paymentMethod === "cash"
                  ? "text-orange-500"
                  : "text-stone-500"
              }
            `}
          />

          <div>
            <p
              className="
                font-semibold
                text-stone-900
              "
            >
              Cash Payment
            </p>

            <span
              className="
                text-sm
                text-stone-500
              "
            >
              Pay with cash upon delivery or pickup.
            </span>
                        <span className={`rounded-4xl w-6 h-6 border ${paymentMethod === "cash" ? 'border-orange-500' : 'border-stone-300'} flex justify-center items-center absolute top-3 right-3`}>
                {paymentMethod === "cash" && <span className="rounded-4xl w-4 h-4 bg-orange-500"></span>}
            </span>
          </div>
        </button>

      </div>
    </div>
  );
}