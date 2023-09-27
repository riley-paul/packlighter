export interface ListItem {
  itemId: string;
  quantity: number;
  packed: boolean;
}

export interface Category {
  items: ListItem[];
  name: string;
}
