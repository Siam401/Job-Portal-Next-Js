export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-[calc(100vh-135px)] md:min-h-[calc(100vh-145px)] lg:min-h-[calc(100vh-240px)] lg:ml-64 ml-0 mt-[70px]">
        {children}
      </main>
    </>
  );
}
