import InfoRow from "./InfoRow";
import { IoRestaurantOutline } from "react-icons/io5";

export default function TableSection({ tableCode }) {
  const parseTableCode = () => {
    const [, floorNum, number, section] = tableCode.split("-");
    let floor = "";

    switch (floorNum) {
      case "01":
        floor = "First";
        break;

      case "02":
        floor = "Second";
        break;

      case "03":
        floor = "Third";
        break;
    }

    return {
      floor,
      number,
      section,
    };
  };
  
  return (
    <section className="bg-orange-50">
      <div className="mb-2 flex items-center gap-1">
        <IoRestaurantOutline
          className="
            text-[18px]
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
          Table Details
        </h3>
      </div>

      {/* Details */}

      <div className="space-y-1 pl-2">
        <InfoRow label="Table NO." value={parseTableCode().number} />

        <InfoRow label="Section" value={`${parseTableCode().section} hall`} />

        <InfoRow label="Floor" value={`${parseTableCode().floor} floor`} />
      </div>
    </section>
  );
}
