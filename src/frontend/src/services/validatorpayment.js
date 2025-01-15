const validateCardNumber = (cardNumber) => {
    const regexCardNumber = /^\d{16}$/;
    return regexCardNumber.test(cardNumber) ? null : "El número de tarjeta debe tener 16 dígitos.";
};

const validateCardCVV = (cvv) => {
    const regexCVV = /^\d{3}$/;
    return regexCVV.test(cvv) ? null : "El CVV debe tener 3 dígitos.";
};

// const validateExpiryDate = (expiryDate) => {
//     return new Date(expiryDate) >= new Date() ? null : "La tarjeta ha expirado.";
// };

const validateExpiryDate = (expiryDate) => {
    if (!/^\d{4}-\d{2}$/.test(expiryDate)) {
        return "Formato de fecha no válido (AAAA-MM).";
    }
    return new Date(expiryDate) >= new Date() ? null : "La tarjeta ha expirado.";
};

const validateCardName = (value) => {
    const regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(value) || value.trim().length <= 2) return 'Este campo solo puede contener letras y debe tener al menos 3 caracteres';
    return null;
  };

const validateBillingAndShipping = (value) => {
    const regexSubject = /^[a-zA-Z0-9\s.,!?()&'"-;:]{3,}$/;  // Acepta letras, números, espacios, y algunos signos de puntuación
    return regexSubject.test(value) ? null : 'Este campo solo acepta datos alfanumericos y debe tener al menos 3 caracteres';
  };

  const validateAddress = (address) => {
    const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;  // Acepta letras, números, espacios y algunos caracteres comunes en direcciones
    return regexAddress.test(address) ? null : 'La dirección no es válida'; 
  };

const validatePaymentForm = (formData) => {
    return {
        cardNumber: validateCardNumber(formData.cardNumber),
        cardName: validateCardName(formData.cardName),
        expiryDate: validateExpiryDate(formData.expiryDate),
        cardCVV: validateCardCVV(formData.cardCVV),
        billingAddress: validateAddress(formData.billingAddress),
        shippingAddress: validateAddress(formData.shippingAddress),
    };
};

export default validatePaymentForm;
