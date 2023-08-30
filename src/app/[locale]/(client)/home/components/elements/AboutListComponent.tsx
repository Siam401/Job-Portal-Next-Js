export default function AboutListComponent({ items }: any) {
  return (
    <>
      <ul role="list" className="pt-8 space-y-2 border-t border-gray-200 my-7">
        {items &&
          items.map((value: SectionItem, index: number) => {
            return (
              <li className="flex space-x-2 place-items-center" key={index}>
                <i className="fa fa-check bg-[#39B54A] w-[20px] h-[20px] text-xs text-center text-white leading-[20px] place-items-center rounded-full"></i>
                <span className=" font-normal text-[16px] text-[#343434]">
                  {value.title}
                </span>
              </li>
            );
          })}
      </ul>
    </>
  );
}
