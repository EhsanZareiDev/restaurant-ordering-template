import { FiMessageSquare } from "react-icons/fi";
import { MdNote } from "react-icons/md";

export default function OrderNote({note}) {

  return (
    <section className="max-w-[270px]">

      {/* Section Header */}

      <div className={`${!note || note === "" ? 'hidden' : ''}`}>

        <div className={` mb-2 flex items-center gap-1`}>

        <FiMessageSquare
          className="text-[16px] text-orange-500"
        />

        <h3
          className="
            text-[14px]
            font-semibold
            uppercase
            tracking-wide
            text-stone-900
          "
        >
          Order Notes
        </h3>

      </div>

      <div
        className="
          rounded-md
          border
          border-gray-200
          bg-gray-50
          p-2
        "
      >
        <p
          className="
            text-[12px]
            text-stone-600
          "
        >
          {note}
        </p>
      </div>

      </div>

    </section>
  );
}