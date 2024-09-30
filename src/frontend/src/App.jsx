import LoginButton from './components/auth/LoginButton';
import LogoutButton from './components/auth/LogoutButton';
import { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from './context/AuthContext';
import { createActor } from '../../declarations/backend';
import CartItem from './components/cart-item/cartitem';
import OpenChatFrame from "./components/OpenChatFrame";

//import logo from '/logo.svg';
import './App.css';



function App() {
  // return (
  //   <main>
  //     <div>Hello!</div>
  //   </main>
  // );

  const { isAuthenticated, identity } = useContext(AuthContext);
  
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const [isCartVisible, setIsCartVisible] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => {
    return total + Number(item.product.price) * Number(item.quantity);
  }, 0);

  const [isFormVisible, setIsFormVisible] = useState(false); 
  const [formData, setFormData] = useState({ name: "", idNumber: "", email: "" }); 
  const [orderNumber, setOrderNumber] = useState(null); 

  const [confirmationMessage, setConfirmationMessage] = useState('');//*** Estado para el mensaje de adicionar item al catrito

  const formRef = useRef(null); // Para el formulario de pago

  //const [names, setNames] = useState([]);
  //const [name, setName] = useState("");

  const [isChatOpen, setIsChatOpen] = useState(false); // Estado para controlar la visibilidad del chat
  const chatFrameRef = useRef(null); // Crear una referencia para el chat frame
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Alternar la visibilidad del chat
  };
  const closeChat = () => {
    setIsChatOpen(false); // Cerrar el chat cuando se hace clic en el botón "X"
  };
  
  const handleClickOutside = (event) => {
    // Verificar si el clic fue fuera del chat frame
    if (chatFrameRef.current && !chatFrameRef.current.contains(event.target)) {
      setIsChatOpen(false); // Cerrar el chat
    }
  };
  useEffect(() => {
    // Agregar y limpiar el event listener para clics fuera del chat
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  let canisterId = process.env.CANISTER_ID_BACKEND //REACT_APP_BACKEND_CANISTER_ID;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  });

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
    if (!isCartVisible && isAuthenticated) {
      getCart()
      }
  };

  useEffect(() => {
    getProducts();
    if (isAuthenticated){
      setCartItems([]);
      getCart();
    }
  }, [isAuthenticated]);


  useEffect(() => {
    if (isCartVisible) {
      document.body.classList.add('no-scroll'); // Agrega la clase cuando el carrito está visible
    } else {
      document.body.classList.remove('no-scroll'); // Remueve la clase cuando el carrito no está visible
    }
  }, [isCartVisible]);


    // Para registrar cambios en isFormVisible
    useEffect(() => {
      console.log("isFormVisible:", isFormVisible);
    }, [isFormVisible]);
  
  //*** Efecto para ocultar el mensaje después de 3 segundos
  useEffect(() => {
    if (confirmationMessage) {
      const timer = setTimeout(() => {
        setConfirmationMessage('');
      }, 2000);
      return () => clearTimeout(timer); // Limpiar el timer si el componente se desmonta
    }
  }, [confirmationMessage]);


  // funcion para mostrar todos los productos disponibles
  async function getProducts(){
    try {
      const result = await backend.getProducts();
      console.log(result);
      if (result){
        setProducts(result);
      }
    } catch (err){
      console.log(err);
    }
  }

  // Funcion para obtener los productos del carrito
  async function getCart(){
    try{
      const result = await backend.getCart();
      console.log("Productos en el cart del backend:", result);
      if("ok" in result){
        setCartItems(result.ok);
      } else{
        alert("Error al recuperar el carrito: No autorizado");
      }
    } catch(err){
      console.error(err);
    }
  }

  // Funcion para adicionar productos al carrito
  async function addToCart(product){
    if(!isAuthenticated){
      alert("Usted debe loguearse primero para adicionar productos a su carrito de compra");
      return;
    }
    try{
      const result = await backend.addToCart(product.id, 1)
      if("ok" in result){
        getCart();
        setConfirmationMessage(`${product.name} it has been added`);

      } else if ("err" in result){
        if (result.err === "#productNotFound"){
          alert("Producto no encontrado");
        } else if (result.err === "#unauthorized"){
          alert("tu no estas autorizado para realizar esta accion");
        }
      } 
    } catch (err){
      console.log("error adding to cart:", err);
    }
  }

  // Función para incrementar la cantidad de un producto en el carrito
  const onIncrement = (productId) => {
    const updatedCart = cartItems.map(item => {
      if (item.product.id === productId) {
        const newQuantity = item.quantity + BigInt(1);
        backend.updateQuantity(productId, newQuantity).catch(err => console.error(err));
        return { ...item, quantity: item.quantity + BigInt(1) };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Función para decrementar la cantidad de un producto en el carrito
  const onDecrement = (productId) => {
    const updatedCart = cartItems.map(item => {
      // if (item.product.id === productId && item.quantity > BigInt(1)) {
      //   const newQuantity = item.quantity - BigInt(1);
      //   backend.updateQuantity(productId, newQuantity).catch(err => console.error(err))
      //   return { ...item, quantity: item.quantity - BigInt(1) };
      // }

      if (item.product.id === productId) {
        if (item.quantity > BigInt(1)) {
          //*** Si la cantidad es mayor que 1, decrementamos normalmente
          const newQuantity = item.quantity - BigInt(1);
          backend.updateQuantity(productId, newQuantity).catch(err => console.error(err));
          return { ...item, quantity: newQuantity }; // Decrementar cantidad
        } else if (item.quantity === BigInt(1)) {
          //*** Si la cantidad es 1, preguntar al usuario si desea eliminar el item
          const confirmDelete = window.confirm("¿Desea eliminar el item?");
          if (confirmDelete) {
            //*** Si el usuario confirma, pasamos la cantidad a cero
            backend.updateQuantity(productId, BigInt(0))
              .then(() => {
                getCart(); //*** Recargar el carrito después de eliminar
              })
              .catch(err => console.error(err));
            return { ...item, quantity: BigInt(0) }; // Eliminar item
          }
          //*** Si el usuario no confirma, mantenemos la cantidad en 1
          return { ...item, quantity: BigInt(1) };
        }
      }

      return item;
    });
    setCartItems(updatedCart);
  };

  // Formulario de pago
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { name, idNumber, email } = formData;

    // Validando el nombre de solo letras
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      alert("El nombre y apellido solo deben contener letras");
      return false;
    }

    // Validando el numero de identidad de solo 8 digitos
    if (!/^\d{8}$/.test(idNumber)) {
      alert("El número de identidad debe contener solo 8 dígitos");
      return false;
    }

    // Validando el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{1,}$/;
    if (!emailRegex.test(email)) {
      alert("Debe ingresar un correo electronico valido");
      return false;
    }

    return true;
  };


  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newOrderNumber = Math.floor(Math.random() * 10000); // Generar número de pedido
      setOrderNumber(newOrderNumber);
      setIsFormVisible(false);
      alert(`Pedido confirmado!!! \n Numero de pedido: ${newOrderNumber}`);
    }
  };



  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (name) {
  //     await addName(name);
  //     setName("");
  //   } else {
  //     alert("Please provide a name.");
  //   }
  // };


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <img src="/logo.svg" className="App-logo" alt="logo" /> */}
        <img src="/icpecommerce2.jpg" className="App-logo" alt="logo" />
        <button onClick={toggleCartVisibility} className="cartjpg-button">
          <img src="/cart.png" alt="Cart" />
        </button>
        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
        
      </header>
      <main>
        <h1>Products</h1>
        {/* <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            required
          />
          <button className="button" type="submit">
            Add Name
          </button>
        </form> */}

        {/* {message && <div className="message">{message}</div>} */}

        <ul className="product-list">
          {products.map((product, index) => (
            <li className="product-item" key={index}>
              <img src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>

        {confirmationMessage && (
          <div className="confirmation-message">
            {confirmationMessage}
          </div>
        )}
        
        {isCartVisible && <div className="overlay" onClick={toggleCartVisibility} />}
        {/*Carrito de compras*/}
        {isCartVisible && (
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
              setIsFormVisible(true);

              // *** Desplazar la vista hacia el formulario
              // if (formRef.current) {
              //   formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
              // }

              setTimeout(() => {
                if (formRef.current) {
                  formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Desplazarse suavemente
                }
              }, 100); // *** Ajustar el tiempo si es necesario

            }}>Ir a pagar</button> 

        {/* Formulario de pago */}
        {isFormVisible && (
          <form onSubmit={handleCheckout} className="checkout-form" ref={formRef} > {/* *** Formulario de pago */}
            <label>Por favor ingrese sus datos para emitir y enviarle su constancia</label>
            <label>
              Nombre y Apellido:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Número de documento de identidad:
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleFormChange}
                required
              />
            </label>
            <label>
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
              />
            </label>
            <button type="submit">Confirmar pedido</button>
          </form>
        )}
        {orderNumber && (
          <div>
          <p>Número de pedido: {orderNumber}</p> {/* *** Mostrar número de pedido */}
          <p>Total: ${totalPrice.toFixed(2)}</p>
          </div>
          )}
      </div>
     )}
     {/* <div>Do you help?<br />Click here: Open Chat</div>

     <OpenChatFrame path="/" /> */}

     <div>
     <button style={
        {
          position: 'fixed',
          bottom: '10px',
          right: '10px'
        }
      }
      onClick={toggleChat} // Asigna el manejador de clics
      >
        Do you help? <br /> Click here: Open Chat</button>
        {/* {isChatOpen ? 'Close Open Chat' : 'Do you need help? Click here: Open Chat'} */}


      {isChatOpen && (
        <div className="overlay">
        <div className="chat-frame" ref={chatFrameRef}>
            <button className="close-button" onClick={closeChat}>
              &times;
            </button>
          <OpenChatFrame path="/" />
        </div>
      </div>
      )}

    </div>
      </main>
    </div>
  );




}

export default App;
