import { ORDER_PROGRESS } from "../../../constants/orderProgress/orderProgress";
import { ORDER_STATUS } from "../../../constants/orderProgress/orderStatus";


import { MdOutlineTableRestaurant } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

import ProgressStep from "./ProgressStep";
import { DELIVERY_TYPE } from "../../../constants/checkout";

export default function OrderProgress({ activeStep, deliveryType }) {
  const isDelivery = deliveryType === DELIVERY_TYPE.DELIVERY;

  const activeStepId =
    ORDER_PROGRESS.find((step) => step.status === activeStep)?.id ?? null;

  const progress = ORDER_PROGRESS.map((step) =>
    step.status !== ORDER_STATUS.ASSIGNED
      ? step
      : {
          ...step,
          icon: isDelivery ? TbTruckDelivery : MdOutlineTableRestaurant,
          title: isDelivery ? "Out for Delivery" : "Serving",
          description: isDelivery
            ? "Your order has been handed to the courier."
            : "A waiter is serving your order.",
        },
  );

  return (
    <div
      className="
        rounded-3xl
        border
        border-stone-200
        bg-white
        px-6
        py-5
        shadow-sm
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-stone-900">Order Progress.</h2>

        <span className="text-orange-500 text-shadow-orange-200 text-shadow-lg">
          Step 2 of 4
        </span>
      </div>

      {/* Timeline */}

      <div className="mt-5">
        {progress.map((step, index) => (
          <ProgressStep
            key={step.id}
            icon={step.icon}
            title={step.title}
            description={step.description}
            isActive={step.status === activeStep}
            isComplated={step.id < activeStepId}
            isLast={index === progress.length - 1}
          />
        ))}
      </div>

      {/* Estimated Time */}

      <div
        className="
          mt-5
          rounded-2xl
          bg-orange-50
          p-5
        "
      >
        <p className="text-sm font-medium text-stone-500">Estimated Time</p>

        <h3 className="mt-1 text-2xl font-bold text-orange-500">12–15 min</h3>
      </div>
    </div>
  );
}
