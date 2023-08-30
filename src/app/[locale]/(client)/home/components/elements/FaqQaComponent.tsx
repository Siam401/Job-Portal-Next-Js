'use client';

import { Accordion, AccordionTab } from 'primereact/accordion';

export default function FaqQaComponent({ items }: any) {
  return (
    <>
      <div className="card job-faq">
        <Accordion activeIndex={0}>
          {items &&
            items.map((value: SectionItem, index: number) => {
              return (
                <AccordionTab 
                header={value.title} 
                key={index}
                >
                  <p className="m-0">{value.sub_title}</p>
                </AccordionTab>
              );
            })}
        </Accordion>
      </div>
    </>
  );
}
