type HTApplyItem = {
  title: string;
  sub_title: string;
  description: string;
};

type HTApplyData = {
  title: string;
  sub_title: string;
  image: string;
  items: HTApplyItem[];
};

export type { HTApplyItem, HTApplyData };
