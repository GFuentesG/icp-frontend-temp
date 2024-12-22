import Apptemp from "./Apptemp";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Router from "./router/Router";
import './App.css';

function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Router />
        <Apptemp />
      </BrowserRouter>
    </AuthProvider >


  );
}

export default App;
