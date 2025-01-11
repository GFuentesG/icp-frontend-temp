import React, { useState } from "react";
import styles from "./Payment.module.css";

export const Payment = () => {
    const [paymentData, setPaymentData] = useState(
        {
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cardCVV: "",
            billingAddress: "",
            shippingAddress: "",
        }
    );

    const handleChange = (e) => {
        const {name, value} = e.target;
        setPaymentData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos de pago enviados:", paymentData);
        //codigo de envio de datos
    }

    return(
        <div className={styles.paymentContainer}>
      <h2>Detalles de Pago</h2>
      <form onSubmit={handleSubmit} className={styles.paymentForm}>
        <div>
          <label>Número de Tarjeta</label>
          <input
            type="text"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div>
          <label>Nombre del Titular</label>
          <input
            type="text"
            name="cardHolder"
            value={paymentData.cardName}
            onChange={handleChange}
            placeholder="Nombre completo"
            required
          />
        </div>
        <div>
          <label>Fecha de Expiración</label>
          <input
            type="month"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>CVV</label>
          <input
            type="password"
            name="cvv"
            value={paymentData.cardCVV}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>
        <div>
          <label>Dirección de Facturación</label>
          <textarea
            name="billingAddress"
            value={paymentData.billingAddress}
            onChange={handleChange}
            placeholder="Calle, Ciudad, Código Postal"
            required
          />
        </div>
        <button type="submit">Pagar</button>
      </form>
    </div>
    );
};

export default Payment;