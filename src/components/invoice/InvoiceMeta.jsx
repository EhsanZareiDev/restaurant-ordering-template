
import {HiOutlineClock, HiOutlineCalendarDays, HiOutlineCreditCard } from "react-icons/hi2";

export default function InvoiceMeta({createdAt , paymentMethod}) {

  const setFormatDate = () => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(createdAt));
};

const setFormatTime = () => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(createdAt));
};


  return (
    <section
      className="
        grid
        grid-cols-3
        gap-5
        border-y
        border-orange-100
        py-3
        mt-4
      "
    >
      <MetaItem icon={<HiOutlineCalendarDays />} title="Date" value={setFormatDate()} />

      <MetaItem icon={<HiOutlineClock />} title="Time" value={setFormatTime()} />

      <MetaItem
        icon={<HiOutlineCreditCard />}
        title="Payment Method"
        value={paymentMethod}
      />
    </section>
  );
}

function MetaItem({ icon, title, value }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="
          mt-0.5
          text-[24px]
          text-orange-500
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-[10px]
            tracking-[1px]
            uppercase
            tracking-wide
            text-stone-500
          "
        >
          {title}
        </p>

        <p
          className="
            text-[14px]
            font-medium
            font-medium
            text-stone-800
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}
