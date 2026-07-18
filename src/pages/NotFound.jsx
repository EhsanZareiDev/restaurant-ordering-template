// Third Party Libraries
import { Link } from "react-router-dom";
// Icon
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
// Components
import Button from "../components/common/Button";
// Assets
import NotFoundImage from "../assets/image/404.png"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          border
          border-stone-200
          bg-white
          p-6
          text-center
          shadow-xl
        "
      >
        {/* Image */}

        <div
          className="
            
            mb-8
          "
        >
          <img src={NotFoundImage} className="h-80 mx-auto" alt="" />
        </div>

        {/* Error Code */}

        <h1
          className="
            text-6xl
            font-extrabold
            tracking-tight
            text-orange-500
          "
        >
          404
        </h1>

        {/* Title */}

        <h2
          className="
            mt-5
            text-3xl
            font-bold
            text-stone-800
          "
        >
          Page Not Found.
        </h2>

        {/* Description */}

        <p
          className="
            mt-4
            leading-7
            text-stone-500
          "
        >
          The page you're looking for doesn't exist or may have been moved.
        </p>

        {/* Button */}

        <div className="mt-10">
          <Link to="/">
            <Button>
              <ArrowLongLeftIcon className="h-6 w-6" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}