export default function PageContainer({ children }) {
  return (
    <div className="mx-auto max-w-7xl border-4 border-white rounded-3xl p-4">
      <div className=" px-4 py-8 md:px-8 shadow-white-20px bg-white rounded-2xl">
        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {children}
        </section>
      </div>
    </div>
  );
}
