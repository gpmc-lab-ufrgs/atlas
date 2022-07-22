export type MapPropsContentType = {
  label: string;
  title: string;
  description: string;
  format?: any;
  type?: string;
  nestedData?: Array<MapPropsContentType>;
};

export type MapPropsSectionType = {
  title: string;
  content: Array<MapPropsContentType>;
};
