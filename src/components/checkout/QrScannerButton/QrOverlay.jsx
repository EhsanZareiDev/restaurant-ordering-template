export default function QrOverlay() {
  return (
    <div
      className="
                pointer-events-none
                absolute
                inset-0
            "
    >

        <div
    className="
        absolute
        top-0
        left-0
        right-0
        h-[15%]
        bg-black/40
        rounded-t-2xl
    "
/>

<div
    className="
        absolute
        bottom-0
        left-0
        right-0
        h-[15%]
        bg-black/40
        rounded-b-2xl
    "
/>

<div
    className="
        absolute
        top-[15%]
        bottom-[15%]
        left-0
        w-[15%]
        bg-black/40
    "
/>

<div
    className="
        absolute
        top-[15%]
        bottom-[15%]
        right-0
        w-[15%]
        bg-black/40
    "
/>
<div
    className="
        absolute

        top-1/2
        left-1/2

        -translate-x-1/2
        -translate-y-1/2

        h-64
        w-64
    "
/>
      <div
        className="
        absolute
        left-10
        top-10

        h-12
        w-12

        border-l-4
        border-t-4

        border-orange-500

        rounded-tl-xl
    "
      />

      <div
        className="
        absolute
        right-10
        top-10

        h-12
        w-12

        border-r-4
        border-t-4

        border-orange-500

        rounded-tr-xl
    "
      />

      <div
        className="
        absolute
        right-10
        bottom-10

        h-12
        w-12

        border-r-4
        border-b-4

        border-orange-500

        rounded-br-xl
    "
      />
      <div
        className="
        absolute
        left-10
        bottom-10

        h-12
        w-12

        border-l-4
        border-b-4

        border-orange-500

        rounded-bl-xl
    "
      />



      <div
    className="
    line-scanner
        absolute

        left-12
        right-12

        h-1

        rounded-full

        bg-orange-500

        shadow-[0_0_20px_rgba(249,115,22,0.9)]

        animate-scanner
    "
/>
    </div>
  );
}
