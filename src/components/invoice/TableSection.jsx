import InfoRow from "./InfoRow";
import { IoRestaurantOutline } from "react-icons/io5";

export default function TableSection({ tableCode }) {
  const parseTableCode = (code) => {
    if (!code) return {};
    const [, floorNum, number, section] = tableCode.split("-");

    const FLOOR_MAP = {
      "01": "First",
      "02": "Second",
      "03": "Third",
    };

    return {
      floor: FLOOR_MAP[floorNum] ?? floorNum,
      number,
      section,
    };
  };

  const tableInfo = parseTableCode(tableCode);

  return (
    <section className="bg-orange-50">
      {/* Section Header */}
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
        <InfoRow label="Table No." value={tableInfo.number} />

        <InfoRow label="Section" value={`${tableInfo.section} Hall`} />

        <InfoRow label="Floor" value={`${tableInfo.floor} Floor`} />
      </div>
    </section>
  );
}
