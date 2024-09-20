// src/hooks/useProductDataCart.ts
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { CategoryProduct } from "../interface/CategoryProductInterface";
import { ProductModel } from "../interface/ProductModel";
import { useAuth } from "@/Context/AuthContext";

interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryProduct;
  images: string[];
  total: number;
}

const useProductDataCart = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const [product, setCartProduct] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [itemAmount, setItemAmount] = useState(0);

  const fetchItemsFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const itemsJson = localStorage.getItem("carted") || "[]";
      return JSON.parse(itemsJson) as Item[];
    }
    return [];
  };

  const addToCart = (value: number, data: ProductModel) => {
    if (typeof window !== "undefined") {
      const items = fetchItemsFromLocalStorage();
      const itemIndex = items.findIndex((item) => item.id === data.id);

      if (itemIndex === -1) {
        const newItem: Item = {
          id: data.id,
          title: data.title,
          price: data.price,
          description: data.description,
          category: data.category,
          images: data.images,
          total: value,
        };
        items.push(newItem);
      } else {
        items[itemIndex].total += value;
      }
      if (isAuthenticated) {
        localStorage.setItem("carted", JSON.stringify(items));
        window.dispatchEvent(new Event("local-storage-update"));
      } else {
        router.push("/login");
      }
    }
  };

  const removeFromCart = (id: number) => {
    if (typeof window !== "undefined") {
      let items = fetchItemsFromLocalStorage();
      items = items.filter((item) => item.id !== id);
      localStorage.setItem("carted", JSON.stringify(items));
      window.dispatchEvent(new Event("local-storage-update"));
    }
  };

  const increaseAmount = (id: number, amount: number) => {
    if (typeof window !== "undefined") {
      let items = fetchItemsFromLocalStorage();
      const itemIndex = items.findIndex((item) => item.id === id);
      if (isAuthenticated) {
        if (itemIndex !== -1) {
          items[itemIndex].total += amount;
          if (items[itemIndex].total <= 0) {
            items = items.filter((item) => item.id !== id);
          }
          localStorage.setItem("carted", JSON.stringify(items));
          window.dispatchEvent(new Event("local-storage-update"));
        } else {
          Swal.fire(
            "ERROR!",
            "Cart is empty, please add this item to cart first!",
            "error"
          );
        }
      } else {
        router.push("/login");
      }
    }
  };

  const decreaseAmount = (id: number, amount: number) => {
    if (typeof window !== "undefined") {
      let items = fetchItemsFromLocalStorage();
      const itemIndex = items.findIndex((item) => item.id === id);
      if (isAuthenticated) {
        if (itemIndex !== -1) {
          items[itemIndex].total -= amount;
          if (items[itemIndex].total <= 0) {
            items = items.filter((item) => item.id !== id);
          }
          localStorage.setItem("carted", JSON.stringify(items));
          window.dispatchEvent(new Event("local-storage-update"));
        } else {
          Swal.fire("ERROR!", "Item cannot be below zero!", "error");
        }
      } else {
        router.push("/login");
      }
    }
  };

  const clearCart = () => {
    if (typeof window !== "undefined") {
      if (isAuthenticated) {
        localStorage.removeItem("carted");
        setCartProduct([]);
        setTotal(0);
        setItemAmount(0);
        window.dispatchEvent(new Event("local-storage-update"));
      } else {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setCartProduct(fetchItemsFromLocalStorage());
    };

    window.addEventListener("local-storage-update", handleStorageChange);

    return () => {
      window.removeEventListener("local-storage-update", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const items = fetchItemsFromLocalStorage();
    setCartProduct(items);
  }, []);

  useEffect(() => {
    const totalValue = product.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.total;
    }, 0);

    setTotal(totalValue);
  }, [product]);

  useEffect(() => {
    const amount = product.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.total;
    }, 0);

    setItemAmount(amount);
  }, [product]);

  return {
    addToCart,
    removeFromCart,
    increaseAmount,
    decreaseAmount,
    clearCart,
    total,
    itemAmount,
    product,
    fetchItemsFromLocalStorage,
  };
};

export default useProductDataCart;
