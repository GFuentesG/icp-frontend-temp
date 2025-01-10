import React, { useState, useEffect} from 'react';
import ProductList from '../../components/productlist/ProductList';
import { createActor } from '../../../../declarations/backend';


export const Home = () => {

  const [products, setProducts] = useState([]);

  //referencia del actor de motoko
  let canisterId = process.env.CANISTER_ID_BACKEND //REACT_APP_BACKEND_CANISTER_ID;

  let backend = createActor(canisterId, {
    agentOptions: {
      // identity: identity,
      host: "http://localhost:4943",
    },
  });

  useEffect(() => {
    getProducts();
    // if (isAuthenticated){
    //   setCartItems([]);
    //   getCart();
    // }
  //}, [isAuthenticated]);
  }, []);


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

  return (
    <>

    <ProductList products={products}/>
    </>
    
  )
}

export default Home;
