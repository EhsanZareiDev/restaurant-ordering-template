// Third Party Libraries
import { Link } from "react-router-dom";
// Icons
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";

export default function PageHeader({ title, to }) {
  return (
    <header className="print:hidden mx-auto max-w-7xl py-8 flex items-center justify-between">
      <div>
        <Link
          to={to}
          className="inline-flex text-lg items-center gap-2 text-gray-600 transition hover:-translate-x-1 hover:text-orange-600"
        >
          <ArrowLongLeftIcon className="w-6 h-auto" /> {title}
        </Link>
      </div>
    </header>
  );
}
