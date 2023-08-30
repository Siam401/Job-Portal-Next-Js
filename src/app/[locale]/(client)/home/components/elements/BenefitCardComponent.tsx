export default function BenefitCardComponent({ items }: any) {
  return (
    <>
      <div className="col-span-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:gap-y-12 md:grid md:gap-6 md:gap-y-12 md:grid-cols-2 grid gap-y-12">
        {items &&
          items.map((value: SectionItem, index: number) => {
            return (
              <div
                className="bg-white relative shadow-[0px_0px_25px_rgba(40,140,54,0.18)] rounded-[10px] px-[18px] py-[20px]"
                key={index}
              >
                <div className="flex w-[90px] h-[90px] leading-[90px] items-center justify-center bg-white rounded-[10px] absolute top-[-20px] shadow-[0px_0px_15px_rgba(56,152,226,0.3)]">
                  <img className="h-[50px]" src={value.image_url} alt="icon" />
                </div>
                <h3 className="mt-[60px] mb-2 text-[17px] font-bold text-gray-600">
                  {value.title}
                </h3>
                <p className="font-base text-sm text-gray-500 dark:text-gray-600">
                  {value.sub_title}
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
