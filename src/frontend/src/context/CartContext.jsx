import { createContext, useState, useContext, useEffect, children } from "react";
import { createActor } from "../../../declarations/backend";
import { AnonymousIdentity } from "@dfinity/agent";
import { AuthContext } from "./AuthContext";


export const CartContext = createContext();

export const CartProvider = ( {children} ) => {
    const { identity, isAuthenticated } = useContext(AuthContext);
    // console.log(children);
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(true); //para cargar carrito
    const [hasFetchedCart, setHasFetchedCart] = useState(false); //para evitar recargas 
    const [isCartUpdate, setIsCartUpdate] = useState(false);

    let canisterId = process.env.CANISTER_ID_BACKEND //REACT_APP_BACKEND_CANISTER_ID;
    let backend = createActor(canisterId, {
        agentOptions: {
          identity: identity,
          host: "http://localhost:4943",
        },
    });

    const getCart = async () => {
        if(hasFetchedCart) return;
        try {
            const result = await backend.getCart();
            if("ok" in result) {
                setCart(result.ok)
                setHasFetchedCart(true);
            } else {
                alert("Error al obtener el carrito else");
                console.log("Error al obtener el carrito else, identity:", identity); 
            }
        } catch (err){
            console.log("Error al obtener el carrito catch", err);
            console.log("identity cuando ocurre el error catch:", identity); 
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect(() => {
    //     if (identity) {
    //       setHasFetchedCart(false); // Reiniciar el estado para recargar el carrito después de loguearse
    //     }
    //   }, [identity]);


        // Cargar el carrito cuando el componente se monta o cuando el usuario inicia sesión
  useEffect(() => {
    console.log("identity al cargar la página con el useEffect:", identity);
    if (!(identity instanceof AnonymousIdentity) && !hasFetchedCart) {
      getCart(); // Obtener el carrito si el usuario está autenticado y aún no lo hemos cargado
    } else {
        setIsLoading(false);
    }
  }, [identity, hasFetchedCart]);



    const addToCart = async (product) => {
        if (identity instanceof AnonymousIdentity) {
          console.log("el identity es addToCart antes:", identity);
          alert("Debes iniciar sesión para agregar productos al carrito");
          return;
        }
        try {
          console.log("el identity es addToCart adicionando:", identity);
          const result = await backend.addToCart(product.id, 1); // Se agrega 1 por defecto, puedes cambiar este valor
          if ("ok" in result) {
            setHasFetchedCart(false);
            getCart(); // Recargamos el carrito después de agregar el producto
          } else {
            alert("Error al agregar el producto al carrito FE");
          }
        } catch (err) {
          console.error("Error al agregar el producto:", err);
        }
      };

    const removeFromCart = async (productId) => {
        try {
          const result = await backend.removeFromCart(productId);
          if ("ok" in result) {
            setHasFetchedCart(false);
            getCart(); // Recargamos el carrito después de eliminar el producto
          } else {
            alert("Error al eliminar el producto del carrito");
          }
        } catch (err) {
          console.error("Error al eliminar el producto:", err);
        }
    };


    const updateQuantity = async (productId, newQuantity) => {
        try {
          const result = await backend.updateQuantity(productId, newQuantity);
          if ("ok" in result) {
            setHasFetchedCart(false);
            getCart(); // Recargamos el carrito después de actualizar la cantidad
          } else {
            alert("Error al actualizar la cantidad");
          }
        } catch (err) {
          console.error("Error al actualizar la cantidad:", err);
        }
    };


    

return (
    <CartContext.Provider value={{
        cart, 
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        }}>
        {isLoading ? <p>Cargando carrito...</p> : children}
    </CartContext.Provider>
)

};

export const useCart = () => useContext(CartContext);