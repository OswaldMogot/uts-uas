import { Media } from ".";
import { Category } from "./category";


export type Product = {
  id: number;
  name: string;
  description: string;
  category_id: Category['id'];
  category: Category;
  price: string;
  stock: string;
  name: string;
  description: string;
  category_id: Category['id'];
  category: Category;
  price: string;
  stock: string;
  media: Media[];
  created_at: string;
  updated_at: string;
};
