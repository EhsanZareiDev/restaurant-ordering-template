// Icons
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { HiHeart } from "react-icons/hi2";
// Assets
import Stamp from "../../assets/image/stamp.png";

export default function InvoiceFooter() {
  return (
    <footer
      className="
        mt-4
        border-t
        border-stone-200
        pt-2
      "
    >
      <div
        className="
          grid
          grid-cols-2
          items-center
        "
      >
        {/* Contact */}

        <div>
          <h3
            className="
              mb-1.5
              text-[13px]
              uppercase
              tracking-wide

            "
          >
            Contact Us
          </h3>

          <div className="space-y-1">
            <FooterItem icon={<FiPhone />} text="+98 913 911 2322" />

            <FooterItem icon={<FiMail />} text="restaurant@email.com" />

            <FooterItem icon={<FiMapPin />} text="Shariati St. Tehran" />
          </div>
        </div>

        {/* Thank You */}

        <div className="flex items-center gap-4">
          <div className="w-40">
            <h2
              className="
              text-[16px]
              font-bold
              text-orange-500
              uppercase
            "
            >
              Thank You!
            </h2>

            <p
              className="
              mt-0.5
              text-[12px]
              text-stone-500
            "
            >
              We appreciate your order. See you again soon.
            </p>

            <HiHeart className="text-red-500 w-5 h-5 mt-1" />
          </div>

          {/* Stamp */}

          <div className="flex justify-end">
            <img
              src={Stamp}
              alt="Official Stamp"
              className="
            -rotate-12
              h-24
              object-contain
            "
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="
          text-[14px]
          text-orange-500
        "
      >
        {icon}
      </div>

      <span
        className="
          text-[11px]
          text-stone-600
        "
      >
        {text}
      </span>
    </div>
  );
}
