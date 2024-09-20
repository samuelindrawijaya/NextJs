import { IoMdAdd, IoMdRemove } from "react-icons/io";
import useProductDataCart from "@/hooks/useCartController";

const CheckoutData = ({ item }: any) => {
    const { id, title, price, images, total } = item;
    const { decreaseAmount, increaseAmount } = useProductDataCart();

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
            <div className="flex items-center justify-between gap-6">
                <div className="w-16 h-16">
                    <img
                        className="w-full h-full object-cover rounded-md"
                        src={images[0]}
                        alt={title}
                    />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{title}</p>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={() => decreaseAmount(id, 1)}
                        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        <IoMdRemove />
                    </button>
                    <span className="mx-2 text-lg">{total}</span>
                    <button
                        onClick={() => increaseAmount(id, 1)}
                        className="p-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                    >
                        <IoMdAdd />
                    </button>
                </div>
                <p className="font-semibold text-gray-900">
                    ${(price * total).toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default CheckoutData;
