const validateNameAndLastname = (value) => {
    const regexName = /^[a-zA-Z\s]*$/;
    if (!regexName.test(value) || value.trim().length <= 2) return 'Este campo solo puede contener letras y debe tener al menos 3 caracteres';
    return null;
  };
  
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email) ? null : 'Correo electrónico no válido';  
  };
  
  const validateAddress = (address) => {
    const regexAddress = /^[a-zA-Z0-9\s,.'-]{3,}$/;  // Acepta letras, números, espacios y algunos caracteres comunes en direcciones
    return regexAddress.test(address) ? null : 'La dirección no es válida'; 
  };
  
  const validatePhone = (phone) => {
    const regex = /^[0-9]{10,14}$/;
    return regex.test(phone) ? null : 'Número de teléfono no válido (entre 10 y 14 digitos)'; 
  };
  
  const validateSubjectAndMessage = (value) => {
    const regexSubject = /^[a-zA-Z0-9\s.,!?()&'"-;:]{3,}$/;  // Acepta letras, números, espacios, y algunos signos de puntuación
    return regexSubject.test(value) ? null : 'Este campo solo acepta datos alfanumericos y debe tener al menos 3 caracteres';
  };
  
  // Componente general para validación
  const validator = (formData) => {
    return {
        name: validateNameAndLastname(formData.name),
        lastname: validateNameAndLastname(formData.lastname),
        address: validateAddress(formData.address),
        email: validateEmail(formData.email),
        phone: validatePhone(formData.phone),
        subject: validateSubjectAndMessage(formData.subject),
        message: validateSubjectAndMessage(formData.message),
    };
  };
  
  export default validator;