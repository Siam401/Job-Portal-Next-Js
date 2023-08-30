type LayoutProps = {
  children: React.ReactNode;
};

export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      <section className="bg-gradient-to-br from-[#3AB54B]/[0.15] via-[#ED6922]/[0.15] to-[#3399FF]/[0.15]">
        <div className="px-4 py-20 lg:py-[100px] lg:grid lg:grid-cols-12 max-w-screen-xl mx-auto lg:space-x-7">
          {children}
        </div>
      </section>
    </>
  );
}
