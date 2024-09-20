import { useState } from "react";
import FilterButton from "../filter/index";
import { ProductModel } from "../interface/ProductModel";
import { CategoryProduct } from "../interface/CategoryProductInterface";


interface ProductProps {
    products: ProductModel[]
    menuItems: CategoryProduct[]
    filterItems: any;
    setItems: any;
}

const ProductsFilter = ({ setItems, menuItems, filterItems, products }: ProductProps) => {
    const filterAll = 'all';
    const [selectedCategory, setSelectedCategory] = useState(filterAll);


    const handleFilter = (category: string) => {
        setSelectedCategory(category);
    }

    return (
        <div
            className="
                flex justify-center flex-wrap gap-4 md:gap-10 lg:gap-16
                font-primary
                "
        >
            <FilterButton
                onClick={() => {
                    setItems(products);
                    handleFilter("All");
                }}
                content="All"
                selectedCategory={selectedCategory}
            />
            {menuItems.map((item) => (
                <FilterButton
                    onClick={() => {
                        filterItems(item.name);
                        handleFilter(item.name);
                    }}
                    key={item.id}
                    content={item.name}
                    selectedCategory={selectedCategory}
                />
            ))}
        </div>
    );
};
export default ProductsFilter;