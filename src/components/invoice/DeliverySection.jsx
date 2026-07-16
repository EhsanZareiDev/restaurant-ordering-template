
import InfoRow from "./InfoRow";
import { HiOutlineMapPin } from "react-icons/hi2";

export default function DeliverySection({addressTitle , postalCode , address}) {
  return (
    <section className="bg-orange-50 flex-shirink-0">

      <div className="mb-2 flex items-center gap-1">

        <HiOutlineMapPin
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
          Delivery Details
        </h3>

      </div>

      <div className="space-y-1 pl-2">

        <InfoRow
          label="Address"
          value={address.length < 20 ? address : address.slice(0, 20) + "..."}
        />

        <InfoRow
          label="Address Title"
          value={addressTitle}
        />

        <InfoRow
          label="Postal Code"
          value={postalCode}
        />

      </div>

    </section>
  );
}