import { useContext } from "react";
import Image from "next/image";
import { HiPlusSm, HiEye } from "react-icons/hi";
import { ProductModel } from "../interface/ProductModel";
import useProductDataCart from "../hooks/useCartController";
import { SidebarContext } from "../Context/sideBarContext";
import Link from "next/link";

interface ProductProps {
    data: ProductModel;
}

const Product: React.FC<ProductProps> = ({ data }) => {
    const { addToCart } = useProductDataCart();
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("SidebarContext must be used within a SidebarProvider");
    }

    const handlecart = (value: number, data: ProductModel) => {
        addToCart(value, data);
    };

    return (
        <div>
            <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[200px] mx-auto flex justify-center items-center">
                        <Image
                            src={data.images[0]}
                            alt={data.title}
                            width={200}
                            height={180}
                            className="max-h-[180px] group-hover:scale-110 transition duration-300"
                        />
                    </div>
                </div>
                <div
                    className="
                    absolute top-6 -right-11 group-hover:right-5 p-2 
                    flex flex-col items-center justify-center 
                    gap-y-2 opacity-0 group-hover:opacity-100
                    transition-all duration-300
                    "
                >
                    <button onClick={() => handlecart(1, data)} aria-label="add to cart">
                        <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
                            <HiPlusSm className="text-3xl" />
                        </div>
                    </button>
                    <Link href={`/product/${data.id}`}
                        className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                    >
                        <HiEye />
                    </Link>
                </div>
            </div>
            <div>
                <div className="text-sm capitalize text-gray-500 mb-1">
                    {data.category.name}
                </div>
                <Link href={`/product/${data.id}`}>
                    <h2 className="font-semibold mb-1">{data.title}</h2>
                </Link>
                <h2 className="font-semibold">$ {data.price}</h2>
            </div>
        </div>
    );
};

export default Product;
