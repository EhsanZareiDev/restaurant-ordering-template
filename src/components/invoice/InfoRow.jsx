

export default function InfoRow({ label, value }) {
  return (
    <div className="grid grid-cols-[90px_1fr] gap-3">

      <span
        className="
          text-[12px]
          text-stone-500
        "
      >
        {label}
      </span>

      <span
        className="
          text-[12px]
          font-medium
          text-stone-900
          break-words
        "
      >
        {value}
      </span>

    </div>
  );
}