import React from "react";

const CheckoutForm =({formData, handleFormChange, handleCheckout}) => {
    return (
        <form onSubmit={handleCheckout}  >  {/* className="checkout-form" ref={formRef} */}
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
    )
}

export default CheckoutForm;