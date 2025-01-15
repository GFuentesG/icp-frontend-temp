import React, { useState } from "react";
import styles from "./Payment.module.css";
import validatePaymentForm from "../../services/validatorpayment";
import Cart from "../cart/Cart";

const Payment = () => {
//revisar que no esta validando datos
    const [paymentData, setPaymentData] = useState({
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cardCVV: "",
            billingAddress: "",
            shippingAddress: "",
        });

    const [errors, setErrors] = useState({
        cardNumber: null,
        cardName: null,
        expiryDate: null,
        cardCVV: null,
        billingAddress: null,
        shippingAddress: null,
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentData((prev) => ({ ...prev, [name]: value }));
    };









    const handleSubmit = (e) => {
        e.preventDefault();
        const validatorError = validatePaymentForm(paymentData);
        setErrors(validatorError);

        if(Object.values(validatorError).some((error) => error)){
            return;
        }

        console.log("Datos de pago enviados:", paymentData);
        //codigo de envio de datos
    }

    return (
        <div className={styles.paymentPage}>
            <div className={styles.cartContainer}>
                <Cart isModal={false}/>
            </div>
            

        <div className={styles.paymentContainer}>
            <h2>Detalles de Pago</h2>
            <form onSubmit={handleSubmit} className={styles.paymentForm}>
                <div>
                    <label htmlFor="cardNumber">Número de Tarjeta</label>
                    <input
                        id="cardNumber"
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"

                    />
                    {errors.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}
                </div>
                <div>
                    <label htmlFor="cardName">Nombre del Titular</label>
                    <input
                        id="cardName"
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handleChange}
                        placeholder="Nombre completo"

                    />
                    {errors.cardName && <p className={styles.error}>{errors.cardName}</p>}
                </div>
                <div>
                    <label htmlFor="expiryDate">Fecha de Expiración</label>
                    <input
                        id="expiryDate"
                        type="month"
                        name="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={handleChange}
                        placeholder="2028-01"

                    />
                    {errors.expiryDate && <p className={styles.error}>{errors.expiryDate}</p>}
                </div>
                <div>
                    <label htmlFor="cardCVV">CVV</label>
                    <input
                        id="cardCVV"
                        type="password"
                        name="cardCVV"
                        value={paymentData.cardCVV}
                        onChange={handleChange}
                        placeholder="123"

                    />
                    {errors.cardCVV && <p className={styles.error}>{errors.cardCVV}</p>}
                </div>
                <div>
                    <label htmlFor="billingAddress">Dirección de Correo de Facturación</label>
                    <input
                        id="billingAddress"
                        type="email"
                        name="billingAddress"
                        value={paymentData.billingAddress}
                        onChange={handleChange}
                        placeholder="facturacion@dominio.com"
                    />
                    {errors.billingAddress && <p className={styles.error}>{errors.billingAddress}</p>}
                </div>
                <div>
                    <label htmlFor="shippingAddress">Dirección de Correo de Envio</label>
                    {/* <textarea
                        id="shippingAddress"
                        name="shippingAddress"
                        value={paymentData.shippingAddress}
                        onChange={handleChange}
                        placeholder="Calle, Ciudad, Código Postal"

                    /> */}
                    <input
                        id="shippingAddress"
                        name="shippingAddress"
                        type="email"
                        value={paymentData.shippingAddress}
                        onChange={handleChange}
                        placeholder="destinatario@dominio.com"
                    /> 


                    {errors.shippingAddress && <p className={styles.error}>{errors.shippingAddress}</p>}
                </div>
                <button type="submit">Pagar</button>
            </form>
        </div>
        </div>
    );
};

export default Payment;