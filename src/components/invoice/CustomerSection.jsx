// Icons
import { HiOutlineUserCircle } from "react-icons/hi2";
import { MinusIcon } from "@heroicons/react/24/outline";
// Components
import InfoRow from "./InfoRow";



export default function CustomerSection({name , phone , email}) {
  return (
    <section className="bg-orange-50 flex-shirink-0">

      <div className="mb-2 flex items-center gap-1">

        <HiOutlineUserCircle
          className="
            text-[24px]
            text-orange-500
          "
        />

        <h3
          className="
            font-semibold
            uppercase
            text-stone-800
          "
        >
          Customer
        </h3>

      </div>

      <div className="space-y-1 pl-2">

        <InfoRow
          label="Name"
          value={name}
        />

        <InfoRow
          label="Phone"
          value={phone}
        />

        <InfoRow
          label="Email"
          value={email === "" || !email ? <MinusIcon className="w-6 h-5" /> : email}
        />

      </div>

    </section>
  );
}