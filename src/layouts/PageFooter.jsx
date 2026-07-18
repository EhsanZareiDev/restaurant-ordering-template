// Icon
import { BsGithub } from "react-icons/bs";

export default function PageFooter() {
  return (
    <footer className="print:hidden mx-auto max-w-7xl py-8">
      <div>
        <p className=" text-stone-600 flex items-center justify-center">
          Built and designed By
          <a
            href="https://github.com/EhsanZareiDev"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-stone-800 font-semibold inline-flex items-center"
          >
            <BsGithub className="inline-block text-lg mr-1" />
            Ehsan Zarei.
          </a>
          ❤️
        </p>
      </div>
    </footer>
  );
}
