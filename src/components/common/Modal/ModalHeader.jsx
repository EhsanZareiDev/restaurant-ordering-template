import { FiX } from "react-icons/fi";



export default function ModalHeader({title , onClose}) {
    return (
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-stone-800">{title}</h2>
            </div>

            <button
              onClick={onClose}
              className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-stone-500
            transition-all
            duration-200
            hover:bg-orange-100
            hover:text-orange-600
        "
            >
              <FiX size={20} />
            </button>
        </div>
    )
}