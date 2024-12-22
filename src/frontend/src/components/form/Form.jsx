import { useState } from "react";
import styles from "./Form.module.css";
import Validator from '../../services/validator';

const Form = () => {

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        address: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })

    const [showSummary, setShowSummary] = useState(false);

    const [errors, setErrors] = useState({
        name: null,
        lastname: null,
        address: null,
        email: null,
        phone: null,
        subject: null,
        message: null,
    })



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const simulateEmailSending = (formData) => {
        // Simulamos el envoio del formulario
        console.log("Simulando envío de datos al correo...");
        console.log("Datos del formulario:", formData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validatorError = Validator(formData);
        setErrors(validatorError);


        if (Object.values(validatorError).some((error) => error)) {
            return;
        }

        simulateEmailSending(formData);
        setShowSummary(true);
    };

    return (
        <div className={styles.formWrapper}>
            {!showSummary ? (
                <>
                    <h2 className={styles.subtitle}>CONTACTO</h2>
                    <h1 className={styles.title}>Dejanos tus datos e indicanos tu consulta</h1>
                    <form className={styles.formContainer} onSubmit={handleSubmit}>
                        <div className={styles.formGroup} >
                            <label htmlFor="name">Nombre: </label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} data-testid="name" role="name"/>
                            {errors.name && <p className={styles.error}>{errors.name}</p>}
                        </div>
                        <div className={styles.formGroup} >
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" name="lastname" id="lastname" value={formData.lastname} onChange={handleChange} data-testid="lastname" role="lastname"/>
                            {errors.lastname && <p className={styles.error}>{errors.lastname}</p>}
                        </div>
                        <div className={styles.formGroup} >
                            <label htmlFor="address">Direccion: </label>
                            <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} data-testid="address" role="address"/>
                            {errors.address && <p className={styles.error}>{errors.address}</p>}
                        </div>
                        <div className={styles.formGroup} >
                            <label htmlFor="email">Correo: </label>
                            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} data-testid="email" role="email"/>
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
                        </div>
                        <div className={styles.formGroup} >
                            <label htmlFor="phone">Telefono: </label>
                            <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} data-testid="phone" role="phone"/>
                            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="subject">Asunto: </label>
                            <input type="text" name="subject" id="subject" value={formData.subject} onChange={handleChange} data-testid="subject" role="subject"/>
                            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
                        </div>
                        <div className={styles.formGroup + " " + styles.message}>
                            <label htmlFor="message">Mensaje:</label>
                            <textarea name="message" id="message" value={formData.message} onChange={handleChange} rows="4" data-testid="message" role="message"/>
                            {errors.message && <p className={styles.error}>{errors.message}</p>} {/* *** Mostrar errores del nuevo campo */}
                        </div>

                        <button type="submit" className={styles.submitButton} >Enviar</button>

                    </form>
                </>
            ) : (
                <>
                    <h2>Datos enviados</h2>
                    <section className={styles.summary}>
                        <p>Nombre: {formData.name}</p>
                        <p>Apellido: {formData.lastname}</p>
                        <p>Direccion: {formData.address}</p>
                        <p>Correo: {formData.email}</p>
                        <p>Telefono: {formData.phone}</p>
                        <p>Asunto: {formData.subject}</p>
                        <p>Mensaje: {formData.message}</p>
                    </section>
                </>
            )}
        </div>
    )
}

export default Form