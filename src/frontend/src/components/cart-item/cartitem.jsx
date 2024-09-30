//import "./CartItem.css";

//function CartItem(props) {
function CartItem({product, quantity, onIncrement, onDecrement}) {
    const quantityNumber = Number(quantity);
    //let { product, onIncrement, onDecrement } = props;
    return(
        // <li key={props.product.id}>Item {props.product.id}</li>
 
        <div className='car-item'>
            <img src={product.image} alt={product.name} />
            <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            {/* </div>
            <div> */}
            <p>Price: ${product.price}</p>
            </div>
            <div className='quantity-controls'>
                <p className="quantity-label">Cantidad:</p>
                <div className="quantity-buttons">
                <button onClick={() => onDecrement(product.id)}>-</button>
                <span>{quantityNumber}</span>
                <button onClick={()=> onIncrement(product.id)}>+</button>
                </div>
            </div>
            <p>Sub Total: ${(product.price * quantityNumber).toFixed(2)}</p>
        </div>
    )
}

export default CartItem;