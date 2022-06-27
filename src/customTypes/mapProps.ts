export type MapPropsContentType = {
  label: string;
  title: string;
  description: string;
  format: any;
  type?: string;
};

export type MapPropsSectionType = {
  title: string;
  content: Array<MapPropsContentType>;
};

export type MapActionType = 'Click' | 'Hover';
