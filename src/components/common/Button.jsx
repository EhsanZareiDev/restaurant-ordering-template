



export default function Button({children , onClick=() => {} , type = "button"}) {
    return (
        <button
        type={type}
        className="
          mt-5
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-orange-500
          px-6
          py-4
          text-lg
          text-white
          shadow-lg
          shadow-orange-200
          transition-all
          duration-300
          hover:-translate-y-1
          hover:bg-orange-600
          hover:shadow-xl
          active:scale-[0.98]
          cursor-pointer
        "
        onClick={onClick}
      >
        {children} 
      </button>
    );
}