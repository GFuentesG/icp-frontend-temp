import React, { useState, useEffect } from "react";

// const CheckoutModal =({
//     isformvisible, 
//     setIsformVisible, 
//     handleCheckout, 
//     formData, 
//     handleFormChange, 
//     formRef
// })
const CheckoutModal = ({ isFormVisible, setIsFormVisible, formRef, totalPrice  }) => {
    if(!isFormVisible) return null;
    const [formData, setFormData] = useState({ name: "", idNumber: "", email: "" });
    const [orderNumber, setOrderNumber] = useState(null);
    
    useEffect(() => {
        // Verificar si el formulario es visible
        console.log("El estado 'isFormVisible' ha cambiado:", isFormVisible);
      }, [isFormVisible]);
    
    //   const handleCheckout = (e) => {
    //     e.preventDefault();
    
    //     // Validaciones del formulario
    //     const nameRegex = /^[A-Za-z\s]+$/;
    //     const idNumberRegex = /^\d{8}$/;
    
    //     if (!nameRegex.test(formData.name)) {
    //       alert("El nombre solo debe contener letras.");
    //       return;
    //     }
    
    //     if (!idNumberRegex.test(formData.idNumber)) {
    //       alert("El número de documento debe contener exactamente 8 dígitos.");
    //       return;
    //     }
    
    //     if (!formData.email.includes("@") || !formData.email.includes(".")) {
    //       alert("Por favor, ingrese un correo electrónico válido.");
    //       return;
    //     }
    
    //     // Si todo es válido, continuar con la lógica de confirmación de pedido
    //     console.log("Formulario enviado con éxito:", formData);
    
    //     // Ocultar el formulario una vez completado
    //     setIsFormVisible(false);
    //   };
    
      const handleFormChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleOutsideClick = (e) => {
        // Cerrar el modal si se hace clic fuera del formulario
        if (formRef.current && !formRef.current.contains(e.target)) {
          console.log("Haciendo clic fuera del formulario, cerrando modal...");
          setIsFormVisible(false);
        }
      };
    
      // Agregar un event listener para detectar clics fuera del formulario
      useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, []);
    
    //   // Mostrar el modal solo si isFormVisible es true
    //   if (!isFormVisible) {
    //     return null;
    //   }

        // Validando datos dentro del formulario
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
          alert(`Pedido confirmado!!! \n Número de pedido: ${newOrderNumber}`);
        }
      };

      const handleClose = () => {
        // Restablecer el estado del formulario
        setFormData({ name: "", idNumber: "", email: "" });
        //setOrderNumber(null); // Restablecer el número de pedido
        //setIsFormVisible(false); // Cerrar el modal
        console.log("cerrando formulario ...") // ***************** REVISAR POQUE EL BOTON NO CIERRA, ALGO TIENE QUE VER CON EL FORMULARIO PADRE
        //setIsFormVisible((prev) => !prev);
        //setIsFormVisible(!isFormVisible);
        setIsFormVisible(false);
        
        console.log("luego de que debe ejecutarse setIsFormVisible")
    };


    return (
        <div className="checkout-modal-overlay">
        <div className="checkout-modal" ref={formRef} >

            
        <form onSubmit={handleCheckout} className="checkout-form"  >  
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

          {orderNumber && (
          <div className="order-confirmation">
            <h3>Pedido confirmado!</h3>
            <p>Número de pedido: {orderNumber}</p> {/* *** Mostrar número de pedido */}
            <p>Total: ${totalPrice.toFixed(2)}</p> {/* *** Mostrar total del pedido */}
            {/* <button onClick={handleClose}>Salir</button> */}
            <p>Para iniciar nuevamente dale click fuera del formulario</p>
          </div>
        )}
          </div>
          </div>
    )
}

export default CheckoutModal;