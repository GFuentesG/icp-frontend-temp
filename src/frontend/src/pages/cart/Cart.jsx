import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import CartItem from "../../components/cart-item/cartitem";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import CartModal from "../../components/CartModal";

export const Cart = ({isModal = true}) => {

  const { cart, isLoading, addToCart, removeFromCart, updateQuantity } = useCart();

  // const [cartItems, setCartItems] = useState([]);

  // Aquí accedemos al contexto de autenticación para obtener el identity
  const { identity, isAuthenticated } = useContext(AuthContext);  // Asegúrate de usar el contexto aquí

  const navigate = useNavigate();
  
  // Si no está logueado, muestra un mensaje de advertencia
  useEffect(() => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para ver el carrito.");
    }
  }, [isAuthenticated]);


  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);

  if (isLoading) {
    return <p>Cargando carrito pagina cart...</p>;
    console.log("identity al hacer clic en el carrito isLoading:", identity);
  }

  return (
    <>
      {/* <CartModal /> */}
      <div className={isModal ? styles.cartmodal : styles.carnomodal}>
        <div className={styles.cartheader}>
          <h2 className={styles.cartheaderh2}>Tu carrito</h2>
          {isModal && (
            <button 
            className={styles.cartheaderbutton}
            onClick={() => navigate("/")}>X</button>
            )}
        </div>
        <ul className="cart-list">
          {cart.map((item) => (
            // <li className="cart-item" key={index}>
            //   <img src={item.product.image} alt={item.product.name} />
            //   <h3>{item.product.name}</h3>
            //   <p>{item.product.description}</p>
            //   <p>Quantity: {item.quantity}</p>
            //   <p>Price: ${item.product.price}</p>
            // </li>
            <CartItem
              key={item.product.id} //item.product.id   index
              product={item.product}
              quantity={item.quantity}
              onIncrement={() => updateQuantity(item.product.id, item.quantity + 1)}
              onDecrement={() => updateQuantity(item.product.id, item.quantity - 1)}
            />
          ))}
        </ul>
        
          <p  className={styles.totalText}><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
          <button 
          className={styles.centeredButton}
          onClick={() => navigate("/")}>Continuar comprando</button>
          <br></br>
          <br></br>
          {isModal && (
            <button 
            onClick={() => {
            console.log("Botón 'Ir a pagar' clickeado");
            navigate("/payment");
            //setIsFormVisible(true);

            // *** Desplazar la vista hacia el formulario
            // if (formRef.current) {
            //   formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
            // }

            // Cerrar el carrito
            // toggleCartVisibility(); //*** Agregamos el cierre del carrito

            // Mostrar el formulario de pago
            // setIsFormVisible(true); //*** Mostramos el formulario

            // setTimeout(() => {
            //   if (formRef.current) {
            //     formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
            //   }
            // }, 200); // *** Ajustar el tiempo si es necesario

          }}>Ir a pagar</button>
          )}
        
      </div>
    </>
  )
}

export default Cart;











// const CartModal = ({ 
//     isCartVisible, 
//     cartItems, 
//     toggleCartVisibility, 
//     totalPrice,
//     onIncrement,
//     onDecrement,
//     setIsFormVisible,
//     formRef
// }) 


