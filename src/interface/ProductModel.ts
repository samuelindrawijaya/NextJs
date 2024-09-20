import { CategoryProduct } from "./CategoryProductInterface"

export interface ProductModel {
    id           : number;
    title        :	string;
    price        :	number;
    description	 :  string;
    category   :  CategoryProduct;
    images       :  string[];
}