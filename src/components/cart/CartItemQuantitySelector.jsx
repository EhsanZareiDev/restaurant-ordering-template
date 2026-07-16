




export default function CartItemQuantitySelector({decreaseQuantity,removeItem,increaseQuantity,quantity,id}) {
    return (
        <div
              className="
              flex
              items-center
              gap-3
              float-left
            "
            >
              <button
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-stone-200
                bg-white
                text-xl
                font-semibold
                text-stone-700
                transition-all
                duration-300
                hover:border-orange-400
                hover:shadow-lg
                hover:text-orange
                active:scale-90
                cursor-pointer
              "
                onClick={() => {
                  quantity > 1
                    ? decreaseQuantity(id)
                    : removeItem(id);
                }}
              >
                −
              </button>

              <div
                className="
                flex
                h-11
                min-w-[64px]
                items-center
                justify-center
                rounded-xl
                bg-stone-100
                text-lg
                font-bold
                text-stone-800
              "
              >
                {quantity}
              </div>

              <button
                className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-orange-500
                text-xl
                font-semibold
                text-white
                shadow-md
                transition-all
                duration-300
                hover:bg-orange-600
                hover:shadow-lg
                active:scale-90
                cursor-pointer
              "
                onClick={() => increaseQuantity(id)}
              >
                +
              </button>
            </div>
    );
}