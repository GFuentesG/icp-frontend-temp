import React from "react";
import styles from './ProductList.module.css';

 const ProductList = ({ products}) => {
    return (
        <ul className={styles.productlist}>
          {products.map((product) => (
            <li className={styles.productitem} key={product.id}>
              <img className={styles.productitemimg} src={product.image} alt={product.name} />
              <h2 className={styles.productitemh2}>{product.name}</h2>
              <p className={styles.productitemp}>{product.description}</p>
              <p className={styles.productitemp}>Price: ${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
    )
} 

export default ProductList;