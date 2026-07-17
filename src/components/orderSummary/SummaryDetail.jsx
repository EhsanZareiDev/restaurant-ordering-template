export default function SummaryDetail({ children }) {
  return (
    <div
      className="
            flex
            items-center
            justify-between
                        px-3
            py-2
            rounded-xl
            transition
            hover:bg-stone-50
          "
    >
      {children}
    </div>
  );
}
