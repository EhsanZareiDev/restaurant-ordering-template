import { DELIVERY_TYPE } from "../../constants/checkout";


export default function DeliverySelector({
  deliveryType,
  setDeliveryType,
}) {
  return (
    <div
      className="
        flex
        items-center

        rounded-full

        bg-stone-100

        p-2

        shadow-inner
      "
    >

        <button
        type="button"
        onClick={() => setDeliveryType(DELIVERY_TYPE.RESTAURANT)}
        className={`
          rounded-full
          cursor-pointer

          px-4
          py-3

          text-base

          transition-all
          duration-300

          ${
            deliveryType === DELIVERY_TYPE.RESTAURANT
              ? `
                bg-orange-500
                text-white
                shadow-lg
                shadow-orange-300/60
              `
              : `
                text-stone-700
                hover:bg-orange-50
              `
          }
        `}
      >

                Restaurant Pickup
      </button>

      
      <button
        type="button"
        onClick={() => setDeliveryType(DELIVERY_TYPE.DELIVERY)}
        className={`
          rounded-full
          cursor-pointer

          px-4
          py-3

          text-base

          transition-all
          duration-300

          ${
            deliveryType === DELIVERY_TYPE.DELIVERY
              ? `
                bg-orange-500
                text-white
                shadow-lg
                shadow-orange-300/60
              `
              : `
                text-stone-700
                hover:bg-orange-50
              `
          }
        `}
      >
        Postal Delivery
      </button>
    </div>
  );
}