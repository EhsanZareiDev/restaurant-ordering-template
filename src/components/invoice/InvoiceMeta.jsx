// Icons
import {
  HiOutlineClock,
  HiOutlineCalendarDays,
  HiOutlineCreditCard,
} from "react-icons/hi2";
// Utils
import { formatDate, formatTime } from "../../utils/formatDate";

export default function InvoiceMeta({ createdAt, paymentMethod }) {
  const invoiceDate = formatDate({
    date: createdAt,
  });

  const invoiceTime = formatTime({
    date: createdAt,
    hour12: true,
  });

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
      <MetaItem
        Icon={HiOutlineCalendarDays}
        title="Date"
        value={invoiceDate}
      />

      <MetaItem
        Icon={HiOutlineClock}
        title="Time"
        isTime
        value={invoiceTime}
      />

      <MetaItem
        Icon={HiOutlineCreditCard}
        title="Payment Method"
        value={paymentMethod}
      />
    </section>
  );
}


function MetaItem({ Icon, title, value, isTime }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="
          mt-0.5
          text-[24px]
          text-orange-500
        "
      >
        <Icon />
      </div>

      <div>
        <p
          className="
            text-[10px]
            tracking-[1px]
            uppercase
            text-stone-500
          "
        >
          {title}
        </p>

        <p
          className={`
            text-[14px]
            font-medium
            text-stone-800
            ${isTime ? 'uppercase' : ''}
          `}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
