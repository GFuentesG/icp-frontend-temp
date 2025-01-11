import {Routes, Route} from "react-router-dom";
import Home from "../pages/home/Home";
import Cart from "../pages/cart/Cart";
import About from "../pages/about/About";
import Login from "../pages/login/Login";
import Contact from "../pages/contact/Contact";
import Payment from "../pages/payment/Payment";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element= {<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="*" element={<h1>Not Fount - 404</h1>} />
            <Route path="/payment" element={<Payment />} />
        </Routes>
    )
}

export default Router;