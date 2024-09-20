import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import Product from '../component/productlist';
import ProductsFilter from '../component/productFilter';
import { ProductModel } from '../interface/ProductModel';
import { CategoryProduct } from '../interface/CategoryProductInterface';
import Hero from '../component/Hero';

interface HomeProps {
  initialProducts: ProductModel[];
  initialCategories: CategoryProduct[];
}

const Home: NextPage<HomeProps> = ({ initialProducts, initialCategories }) => {
  const [filteredItems, setFilteredItems] = useState<ProductModel[]>(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isClient, setIsClient] = useState(false); // Handle client-side only

  const pageItem = 12;

  useEffect(() => {
    setIsClient(true); // Component is mounted on the client
  }, []);

  const filterItems = (filter: string) => {
    const filteredProducts = initialProducts.filter(
      (product) => product.category.name === filter
    );
    setFilteredItems(filteredProducts);
    setCurrentPage(1); // RESET PAGINATION
  };

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * pageItem,
    currentPage * pageItem
  );

  const totalPages = Math.ceil(filteredItems.length / pageItem);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="w-full mb-4">
          <ProductsFilter
            setItems={setFilteredItems}
            menuItems={initialCategories}
            filterItems={filterItems}
            products={initialProducts}
          />
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {paginatedItems.map((product) => (
              <Product data={product} key={product.id} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 mx-1 bg-pink-200 text-white rounded-md hover:bg-pink-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 text-sm font-medium border rounded-md ${
                  currentPage === index + 1
                    ? 'bg-pink-400 text-white border-pink-500'
                    : 'bg-white text-pink-400 border-pink-300 hover:bg-pink-100'
                } transition-all duration-300`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 mx-1 bg-pink-200 text-white rounded-md hover:bg-pink-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [productsRes, categoriesRes] = await Promise.all([
    fetch('https://api.escuelajs.co/api/v1/products?limit=100'),
    fetch('https://api.escuelajs.co/api/v1/categories?limit=10'),
  ]);

  const [initialProducts, initialCategories] = await Promise.all([
    productsRes.json(),
    categoriesRes.json(),
  ]);

  return {
    props: {
      initialProducts,
      initialCategories,
    },
  };
};

export default Home;
