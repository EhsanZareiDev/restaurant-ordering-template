



export default function CartItemImage({alt , src}) {
    return (
              <div
        className="
        col-span-5
            sm:col-span-3
            shrink-0
          relative
          overflow-hidden
          rounded-xl
          bg-stone-100
          h-32
          w-32
          min-w-[100px]
        "
      >
        <img
          src={src}
          alt={alt}
          className="
            h-full
            w-full
            object-cover
            transition-all
            duration-500
            group-hover:scale-105
          "
        />
      </div>
    );
}