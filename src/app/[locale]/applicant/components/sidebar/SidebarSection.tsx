import CompanyLogo from '@/components/layouts/CompanyLogo';
import SidebarItems from './SidebarItems';

type SidebarSectionProps = {
  data: any;
};

const SidebarSection = ({ data }: SidebarSectionProps) => {
  return (
    <>
      <div className="h-full px-3 py-4 overflow-y-auto bg-white">
        <CompanyLogo
          imgClass="h-15 mr-3 h-10"
          imgSrc={data?.logo}
          alt="next it"
          linkClass="
            lg:hidden block mb-4
          "
        />

        {/* section: items */}
        <SidebarItems />
      </div>
    </>
  );
};

export default SidebarSection;
