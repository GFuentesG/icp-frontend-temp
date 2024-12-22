import styles from './About.module.css'; 

const About = () => {
  return (
    <section className={styles.aboutWrapper}>
      <h1 className={styles.title}>Acerca de este proyecto</h1>
      <div className={styles.content}>
        <h2 className={styles.subtitle}>Bienvenido al e-commerce de diseños para pisos y pardes</h2>
        <p>
          Este proyecto permite a los usuarios seleccionar y comprar diferentes diseños.
          Además, podrás iniciar sesión y proximamente crear una lista personalizada con diseños esclusivos.
        </p>
        
        <h3 className={styles.sectionTitle}>¿Cómo funciona?</h3>
        <ul className={styles.featureList}>
          <li>
            <strong>Seleccionar el diseño:</strong> En la pagina de inicio, puedes navegar por una lista de diseños y 
            seleccionar aquellos que te gusten para agregarlos a tu carrito. Tambien proximamente podras hacer click en 
            la imagen que te llevara a la pagina del diseño donde podras ver mas informacion.
          </li>
          <li>
            <strong>Iniciar sesión:</strong> Para poder seleccionar los diseños especiales, primero debes iniciar sesión 
            en la plataforma y se te mostrara una lista de diseños especiales.
          </li>
          <li>
            <strong>Diseños especiales:</strong> Además de los diseños regulares, también tendrás proximamente acceso a 
            diseños especiales que puedes agregar a tu carrito.
          </li>
        </ul>

        <h3 className={styles.sectionTitle}>¿Por qué elegir esta aplicación?</h3>
        <p>
          Esta aplicación está diseñada para ofrecerte una experiencia sencilla y agradable. Puedes crear tu lista de diseños
          agregandola al carrito y tener acceso a los diseños especiales que no encontrarás en otras plataformas.
        </p>

        <h3 className={styles.sectionTitle}>¿Cómo agregar tus diseños al carrito?</h3>
        <p>
          Al explorar los diseños, encontrarás un botón de "Agregar al carrito". Solo tienes que hacer clic en él para añadir
          el diseo que más te guste a tu carrito.
        </p>

        <p>
          ¡Gracias por usar nuestra plataforma! Esperamos que disfrutes seleccionando tus diseos favoritos y explorando los especiales.
        </p>
      </div>
    </section>
  );
};

export default About;

