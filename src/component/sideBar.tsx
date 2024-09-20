// src/components/Sidebar.tsx
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import { SidebarContext } from "../Context/sideBarContext";
import useProductDataCart from "../hooks/useCartController";
import CartData from "./cartData";

const Sidebar: React.FC = () => {
    const context = useContext(SidebarContext);
    const router = useRouter();

    if (context === undefined) {
        throw new Error("SidebarContext must be used within a SidebarProvider");
    }

    const { isOpen, handleClose } = context;
    const { total, itemAmount, product, clearCart, fetchItemsFromLocalStorage } =
        useProductDataCart();

    const [cartProducts, setCartProducts] = useState(product);

    useEffect(() => {
        const handleStorageChange = () => {
            setCartProducts(fetchItemsFromLocalStorage());
        };

        window.addEventListener("local-storage-update", handleStorageChange);

        setCartProducts(fetchItemsFromLocalStorage());

        return () => {
            window.removeEventListener("local-storage-update", handleStorageChange);
        };
    }, []);

    useEffect(() => {
        setCartProducts(product);
    }, [product]);

    const handleCheckout = () => {
        handleClose();
        setTimeout(() => {
            router.replace("/CheckoutPages");
        }, 300);
    };

    return (
        <div
            className={`${isOpen ? "right-0" : "-right-full"
                } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw]
      transition-all duration-300 z-20 px-4 lg:px-[35px]`}
        >
            <div className="flex items-center justify-between py-6 border-b">
                <div className="uppercase text-sm font-semibold">
                    Shopping Bag ({itemAmount})
                </div>
                <div
                    className="cursor-pointer w-8 h-8 flex justify-center items-center"
                    onClick={handleClose}
                >
                    <IoMdArrowForward className="text-2xl" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 h-[320px] lg:h-[380px] overflow-y-auto overflow-x-hidden border-b">
                {cartProducts.length === 0 ? (
                    <div className="flex justify-center items-center p-4">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    cartProducts.map((item) => <CartData item={item} key={item.id} />)
                )}
            </div>
            <div className="flex flex-col gap-y-3 py-4 mt-4">
                <div className="flex w-full justify-between items-center">
                    <div className="uppercase text-semibold">
                        <span className="mr-2">Total:</span>${total.toFixed(2)}
                    </div>
                    <div
                        className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
                        onClick={clearCart}
                    >
                        <FiTrash2 />
                    </div>
                </div>
                <div
                    className="bg-gray-200 flex p-4 justify-center items-center text-primary w-full font-medium cursor-pointer"
                    onClick={handleCheckout}
                >
                    View Cart
                </div>
                <div
                    className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium cursor-pointer"
                    onClick={handleCheckout}
                >
                    Checkout
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
