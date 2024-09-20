import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import useProductDataCart from '../../hooks/useCartController';
import { ProductModel } from '../../interface/ProductModel';

interface ProductPageProps {
  productData: ProductModel;
}

const ProductPage: NextPage<ProductPageProps> = ({ productData }) => {
  const [activeImg, setActiveImage] = useState(productData.images[0]);
  const { addToCart, increaseAmount, decreaseAmount, product } = useProductDataCart();

  const handleDataPlus = (id: number) => {
    increaseAmount(id, 1);
  };

  const handleDataMinus = (id: number) => {
    decreaseAmount(id, 1);
  };

  const handlecart = () => {
    addToCart(1, productData);
  };

  // Fetch the total quantity from the cart data.
  const Totalproducts = product.find((item) => item.id === productData.id);

  return (
    <section className="pt-32 pb-12 lg:py-32 h-screen flex items-center">
      <div className="flex flex-col gap-6 lg:w-2/4">
        <div className="flex flex-2 justify-center items-center mb-8 lg:mb-0">
          <div className="flex flex-col gap-1 lg:w-2/4">
            <img
              src={activeImg}
              alt={productData.title}
              className="w-full h-full aspect-square object-cover rounded-xl"
            />
            <div className="flex flex-row justify gap-6 h-24">
              {productData.images.map((item) => (
                <img
                  key={item}
                  src={item}
                  alt="product image"
                  className="w-24 h-24 rounded-md cursor-pointer"
                  onClick={() => setActiveImage(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:w-2/5">
        <div>
          <span className="text-violet-600 font-semibold">{productData.category.name}</span>
          <h1 className="text-3xl font-bold">{productData.title}</h1>
        </div>
        <p className="text-gray-700">{productData.description}</p>
        <h6 className="text-2xl font-semibold">${productData.price}</h6>
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
              onClick={() => handleDataMinus(productData.id)}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg">
              {Totalproducts?.total ? Totalproducts.total : 1}
            </span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
              onClick={() => handleDataPlus(productData.id)}
            >
              +
            </button>
          </div>
          <button
            onClick={handlecart}
            className="bg-violet-800 text-white font-semibold py-3 px-16 rounded-xl h-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  const { id } = context.params!;
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
  const productData: ProductModel = await res.json();

  return {
    props: {
      productData,
    },
  };
};

export default ProductPage;
