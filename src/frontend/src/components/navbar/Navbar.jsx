import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div>
                <img src="/icpecommerce2.jpg" className={styles.navbarlogo} alt="logo" />
            </div>

            <ul className={styles.navbarLinks}>

                <li><Link to='/'>Inicio</Link></li>
                <li><Link to='cart'>Carrito</Link></li>
                <li><Link to='contact'>Contacto</Link></li>
                <li><Link to='about'>Acerca de</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar