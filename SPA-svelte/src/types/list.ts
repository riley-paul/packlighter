interface ICategory {
  id: string;
  name: string;
  items: string[];
}

export interface IList {
  id: string;
  name: string;
  description: string;
  categories: ICategory[];
}
