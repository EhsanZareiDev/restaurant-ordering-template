import Logo from "../../assets/image/Logo.png";

export default function InvoiceHeader({invoiceNumber}) {
  return (
    <header className="grid grid-cols-3 items-center">
      {/* Logo */}

      <div>
        <img src={Logo} alt="Restaurant Logo" className="h-16 object-contain" />
      </div>

      {/* Title */}

      <div className="text-center">
        <h1
          className="
            text-3xl
            font-extrabold
            tracking-[3px]
            uppercase
            text-stone-900
          "
        >
          Invoice
        </h1>

        <div
          className="
            mx-auto
            mt-1
            h-[2px]
            w-14
            rounded-full
            bg-orange-500
          "
        />
      </div>

      {/* Invoice Number */}

      <div className="text-right">
        <p className="text-xs uppercase text-stone-500">
          Invoice No.
        </p>

        <h2 className="mt-1 text-lg font-semibold text-orange-500">
          #{invoiceNumber}
        </h2>
      </div>
    </header>
  );
}
