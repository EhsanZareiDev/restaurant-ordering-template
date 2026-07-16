import { TrashIcon } from "@heroicons/react/24/outline";
import CartItemImage from "./CartItemImage";
import CartItemQuantitySelector from "./CartItemQuantitySelector";
import { useEffect, useRef } from "react";

export default function CartItem({ item, cartActions }) {
  const datailBox = useRef(null);
  const itemBox = useRef(null);
  const itemInfoBox = useRef(null);

  useEffect(() => {
    const moveBox = () => {
      if (!datailBox.current || !itemBox.current) return;

      const windowIsSm = window.innerWidth <= 768;

      if (windowIsSm) {
        itemBox.current.appendChild(datailBox.current);
      } else {
        itemInfoBox.current.appendChild(datailBox.current);
      }
    };

    moveBox();

    window.addEventListener("resize", moveBox);

    return () => window.removeEventListener("resize", moveBox);
  });

  return (
    <article
      ref={itemBox}
      className="
        group
        grid
        grid-cols-12
        md:flex
        md:gap-5
        rounded-xl
        border
        border-stone-200
        bg-white
        px-4 py-3
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-orange-300

        
      "
    >
      {/* ==========================
          Product Image
      ========================== */}

      <CartItemImage src={item.image} alt={item.name} />

      {/* ==========================
          Product Content
      ========================== */}

      <div
        className="
                     col-span-7
            sm:col-span-9
          flex
          flex-1
          flex-col
          justify-center
          md:justify-between
        "
      >
        <div ref={itemInfoBox} className="md:space-y-4 space-y-0">
          {/* ==========================
            Product Header
        ========================== */}

          <div
            className="
              flex
              flex-col
              md:flex-row
              items-start
              md:justify-between
              gap-4
            "
          >
            <div>
              <h3
                className="
                  text-xl
                  font-bold
                  text-stone-900
                "
              >
                {item.name}
              </h3>

              <p
                className="
                  mt-1
                  text-sm
                  text-stone-400
                "
              >
                {item.category}
              </p>
            </div>

            <div className="text-right">
              <h3
                className="
                text-xl
                  md:text-2xl
                  font-bold
                  text-orange-500
                "
              >
                ${item.price.toFixed(2)} <span className="">each.</span>
              </h3>
            </div>
          </div>

          {/* ==========================
            Bottom Section
        ========================== */}

          <div
            ref={datailBox}
            className="
            col-span-full
            mt-3
            md:mt-6
            flex
            gap-4
            items-center
            justify-between
          "
          >
            {/* ==========================
              Quantity Selector
          ========================== */}

            <CartItemQuantitySelector
              decreaseQuantity={cartActions.decreaseQuantity}
              removeItem={cartActions.removeItem}
              increaseQuantity={cartActions.increaseQuantity}
              quantity={item.quantity}
              id={item.id}
            />

            {/* ==========================
              Subtotal + Delete
          ========================== */}

            <div
              className="
              flex
              items-center
              justify-between
              gap-5
            "
            >
              <div className="text-right">
                <p className="text-sm text-stone-400">Subtotal</p>

                <h3
                  className="
                  text-xl
                  font-bold
                  text-stone-900
                "
                >
                  ${item.price.toFixed(2) * item.quantity}
                </h3>
              </div>

              <button
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                border-red-100
                bg-red-50
                text-red-500
                transition-all
                duration-300
                hover:border-red-300
                hover:bg-red-500
                hover:text-white
                active:scale-95
                cursor-pointer
              "
                onClick={() => cartActions.removeItem(item.id)}
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
