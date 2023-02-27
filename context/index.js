// create the context
// provide the context
// consume that context

import { createContext, useEffect, useState } from "react";

export const Context = createContext(null);

const ProductContext = ({ children }) => {
  // list of products
  const [products, setProducts] = useState([]);

  // loading state
  const [loading, setLoading] = useState(false);

  // favorites
  const [favoriteItems, setFavoriteItems] = useState([]);

  const addToFavorites = (productId, reason) => {
    let copyFavoritesItems = [...favoriteItems];
    const index = copyFavoritesItems.findIndex((item) => item.id === productId);

    if (index === -1) {
      const getCurrentProductItem = products.find(
        (item) => item.id === productId
      );
      copyFavoritesItems.push({
        title: getCurrentProductItem.title,
        id: productId,
        reason,
      });
    } else {
      copyFavoritesItems[index] = {
        ...copyFavoritesItems[index],
        reason,
      };
    }

    setFavoriteItems(copyFavoritesItems);
  };

  const handleRemoveFavorites = (getCurrentId) => {
    let copyFavoritesItems = [...favoriteItems];

    copyFavoritesItems = copyFavoritesItems.filter(
      (item) => item.id !== getCurrentId
    );

    setFavoriteItems(copyFavoritesItems);
  };

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const getProductsFromApi = async () => {
        const res = await fetch("https://dummyjson.com/products", { signal });
        const data = await res.json();
        if (data) {
          setLoading(false);
          setProducts(data.products);
        }
      };
      getProductsFromApi();
    } catch (error) {
      console.log(`Something wrong when fetching API Products ${error}`);
      setLoading(false);
    }

    return () => {
      controller.abort();
      setLoading(false);
    };
  }, []);

  return (
    <Context.Provider
      value={{
        products,
        loading,
        addToFavorites,
        handleRemoveFavorites,
        favoriteItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ProductContext;
