import React, { useContext } from 'react';
import Apptemp from "./Apptemp";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Router from "./router/Router";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import './App.css';

function App() {
  const { identity } = useContext(AuthContext);

  return (

    <AuthProvider>
      <CartProvider identity={identity}> 
        <BrowserRouter>
          <Navbar />
          <Router />
          {/* <Apptemp /> */}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>


  );
}

export default App;
