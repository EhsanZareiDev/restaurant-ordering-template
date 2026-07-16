

export default function Input({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
  required = false,
  disabled = false,
  autoComplete = "off",
  className,
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="
            text-sm
            font-medium
            text-stone-700
          "
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div
        className={`
  flex
  items-center
  gap-3

  rounded-2xl
  border

  px-4
  py-3

  bg-gray-and-white
  

  transition-all
  duration-300

  focus-within:border-orange-400
  focus-within:shadow-[0_0_0_4px_rgba(249,115,22,.15)]

  ${
    error
      ? `
        border-red-400
        bg-red-50
        focus-within:border-red-500
        focus-within:shadow-[0_0_0_4px_rgba(239,68,68,.12)]
      `
      : "border-stone-200"
  }

  ${
    disabled
      ? `
        cursor-not-allowed
        opacity-60
      `
      : ""
  }
  ${className}
`}
      >
        {icon && (
          <span
            className={`
  flex
  items-center
  justify-center

  transition-colors
  duration-300

  ${error ? "text-red-500" : "text-stone-400"}
`}
          >
            {icon}
          </span>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          autoComplete={autoComplete}
          className="
            w-full

            bg-transparent

            text-sm
            font-medium
            text-stone-800

            placeholder:text-stone-400

            outline-none
          "
        />
      </div>
      {error && (
        <p
          className="
            pl-1

            text-xs
            font-medium

            text-red-500
          "
        >
          {error}
        </p>
      )}
    </div>
  );
}
