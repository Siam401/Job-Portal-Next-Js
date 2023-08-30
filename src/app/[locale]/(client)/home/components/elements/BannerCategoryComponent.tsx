export default function BannerCategoryComponent({ items }: any) {
  return (
    <>
      <ul className="flex flex-wrap items-center mb-6 text-[#1e85ff]">
        {items &&
          items.map((value: SectionItem, index: number) => {
            return (
              <li key={index}>
                <a
                  className="block m-1 py-1 px-4 text-sm font-semibold bg-[#3399FE]/10 rounded-full hover:text-white hover:bg-[#3399fe]"
                  href={'jobs?category=' + value.id}
                >
                  {value.title}
                </a>
              </li>
            );
          })}
      </ul>
    </>
  );
}
