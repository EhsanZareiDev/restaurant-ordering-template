import {
  CheckCircleIcon,
  CheckIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Input from "../common/Input";
import { RiCouponFill } from "react-icons/ri";

export default function CouponInput({ couponsAction }) {
  const [couponInput, setCouponInput] = useState("");

  const addCoupon = () => {
    if (couponInput.trim() === "") {
      return;
    } else {
      couponsAction.applyCoupon(couponInput);
    }
  };

  return (
    <div className="mt-8">
      <label
        htmlFor="coupon"
        className={`
            text-stone-800
            mb-2
            block
            font-bold  
          `}
      >
        Coupon Code
      </label>

      <div
        className="
            flex
            gap-2
          "
      >
        {/* <Input
          name="coupon"
          placeholder="Enter coupon..."
          value={couponInput}
          disabled={couponsAction.couponStatus === "success"}
          onChange={(e) => setCouponInput(e.target.value)}
          icon={<RiCouponFill className="h-5 w-5" />}
        /> */}
        <input
          id="coupon"
          type="text"
          placeholder="Enter coupon..."
          className={`
                ${couponsAction.couponStatus === "success" ? "text-green-600 border-green-600" : " border-stone-200"}
              flex-1
              bg-stone-50
              rounded-2xl
              border
              px-4
              py-3
              outline-none
              transition-all
              duration-300
              focus:border-orange-500
              focus:bg-white
            `}
          value={couponInput}
          disabled={couponsAction.couponStatus === "success"}
          onChange={(e) => setCouponInput(e.target.value)}
          onKeyDown={(e) => {
            e.key == "Enter" ? addCoupon() : ""
          }}
        />

        <button
          className={`
            ${couponsAction.couponStatus === "success" ? "bg-green-300 text-green-600 border border-green-600" : "bg-orange-500 text-white cursor-pointer hover:shadow-lg hover:bg-orange-600 active:scale-95"}
              rounded-2xl
              px-4 
              transition-all
              duration-300
              
          `}
          onClick={addCoupon}
          disabled={couponsAction.couponStatus === "success"}
        >
          {couponsAction.appliedCoupon ? (
            <CheckIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </button>
      </div>

      <div
        className={`border rounded-2xl py-3 items-center px-3 mt-4 flex
      ${couponsAction.couponStatus === "error" ? " bg-red-100 border-6ed-400 text-red-600" : ""}
         ${couponsAction.couponStatus === "success" ? " bg-green-100 border-green-600 text-green-600" : ""}
                 ${couponsAction.couponStatus === "idle" ? "hidden" : ""}`}
      >
        {couponsAction.couponStatus === "success" ? (
          <CheckCircleIcon className="text-green-600 w-8 h-8 mr-2" />
        ) : (
          ""
        )}
        {couponsAction.couponStatus === "error" ? (
          <BiErrorCircle className="text-red-600 w-8 h-8 mr-2" />
        ) : (
          ""
        )}

        {couponsAction.couponStatus === "success" ? (
          <span>
            Great! You got a <b>{couponsAction.discountPercent}%</b> discount
            with this code.
          </span>
        ) : (
          ""
        )}
        {couponsAction.couponStatus === "error" ? (
          <span>The entered discount code does not exist.</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
