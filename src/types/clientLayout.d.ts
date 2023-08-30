type LayoutHeader = {
  site_title: string;
  site_description: string;
  favicon: string;
};

type LayoutFooter = {
  text: string;
};

type SocialLinks = {
  title: string;
  url: string;
  icon_image: string;
  icon_type: string;
};

type SEO = {
  title: string;
  description: string;
  keywords: string;
  image: string;
};

export type { LayoutHeader, LayoutFooter, SocialLinks, SEO };
