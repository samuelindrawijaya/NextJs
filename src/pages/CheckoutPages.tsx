import React, { useState } from "react";
import Link from "next/link";
import useProductDataCart from "@/hooks/useCartController";
import CheckoutData from "@/component/CheckoutData";

const CheckoutPages = () => {
  const { total, itemAmount, product, clearCart } = useProductDataCart();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleShippingAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingAddress(e.target.value);
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = () => {
    console.log("Shipping Address:", shippingAddress);
    console.log("Total:", total);
    clearCart();
    setOrderConfirmed(true);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="h-[100px] bg-hero bg-no-repeat bg-cover bg-center py-19"></section>
      <div className="container mx-auto px-4 mt-4">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        {orderConfirmed ? (
          <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-lg shadow-md p-6">
            <p className="text-lg font-semibold">
              Thank you for your purchase!
            </p>
            <p className="text-gray-700 mt-2">Your order has been confirmed.</p>
            <Link href="/" className="text-blue-500 hover:underline">
              Go to Home
            </Link>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            {product.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full h-60 bg-white rounded-lg shadow-md p-6">
                <p className="text-lg font-semibold">Shopping Cart is Empty</p>
                <Link href="/" className="text-blue-500 hover:underline">
                  Go to Home
                </Link>
              </div>
            ) : (
              <>
                <div className="md:w-3/4">
                  {product.map((item) => (
                    <CheckoutData item={item} key={item.id} />
                  ))}
                </div>
                <div className="md:w-1/4">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4">Summary</h2>
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Item Amount</span>
                        <span>{itemAmount}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>${(total / itemAmount).toFixed(2)}</span>
                      </div>
                      <hr className="my-2" />
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">
                          ${(total + total / itemAmount).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Shipping Address
                      </label>
                      <input
                        type="text"
                        value={shippingAddress}
                        onChange={handleShippingAddressChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter your shipping address"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium mb-2">
                        Payment Method
                      </label>
                      <select
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      >
                        <option value="Credit Card">Credit Card</option>
                        <option value="PayPal">PayPal</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    <button
                      onClick={handleCheckout}
                      className="bg-pink-300 text-white py-2 px-4 rounded-lg mt-4 w-full"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPages;
