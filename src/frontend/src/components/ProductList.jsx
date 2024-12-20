import React from "react";

const ProductList = ({ products, addToCart }) => {
    return (
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
    )
} 

export default ProductList;