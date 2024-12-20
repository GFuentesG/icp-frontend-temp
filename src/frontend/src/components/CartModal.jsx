import React , { useState, useEffect } from "react";
import CartItem from "./cart-item/cartitem";


const CartModal = ({ 
    isCartVisible, 
    cartItems, 
    toggleCartVisibility, 
    totalPrice,
    onIncrement,
    onDecrement,
    setIsFormVisible,
    formRef
}) => {
    return (
        isCartVisible && (
            <div className="cart-modal">
              <div className="cart-header">
              <h2>Tu carrito</h2>
              {<button onClick={toggleCartVisibility}>X</button> }
              </div>
              <ul className="cart-list">
                {cartItems.map((item, index) => (
                  // <li className="cart-item" key={index}>
                  //   <img src={item.product.image} alt={item.product.name} />
                  //   <h3>{item.product.name}</h3>
                  //   <p>{item.product.description}</p>
                  //   <p>Quantity: {item.quantity}</p>
                  //   <p>Price: ${item.product.price}</p>
                  // </li>
                  <CartItem
                  key={index}
                  product={item.product}  
                  quantity={item.quantity}
                  onIncrement={() => onIncrement(item.product.id)}
                  onDecrement={() => onDecrement(item.product.id)}
                    />
                ))}
              </ul>
              <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
              <button onClick={toggleCartVisibility}>Continuar comprando</button>
              <br></br>
              <br></br>
              <button onClick={() => {
                console.log("Botón 'Ir a pagar' clickeado");
                //setIsFormVisible(true);
  
                // *** Desplazar la vista hacia el formulario
                // if (formRef.current) {
                //   formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
                // }

                // Cerrar el carrito
                toggleCartVisibility(); //*** Agregamos el cierre del carrito

                // Mostrar el formulario de pago
                setIsFormVisible(true); //*** Mostramos el formulario
  
                // setTimeout(() => {
                //   if (formRef.current) {
                //     formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
                //   }
                // }, 200); // *** Ajustar el tiempo si es necesario
  
              }}>Ir a pagar</button> 
              
        </div>
       )

    )
}

export default CartModal;