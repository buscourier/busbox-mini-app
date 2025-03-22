export interface ReviewField {
  label: string;
  value: string | number;
}

export interface ReviewSection {
  title: string;
  fields: ReviewField[];
}
