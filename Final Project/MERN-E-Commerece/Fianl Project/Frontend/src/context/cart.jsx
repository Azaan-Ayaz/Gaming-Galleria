import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

// const [search, setsearch] = useState({
//     user:null
// })

const CartProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCartIem = localStorage.getItem("cart");
    if (existingCartIem) {
      setCart(JSON.parse(existingCartIem));
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {props.children}
    </CartContext.Provider>
  );
};

// custom hook

const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
