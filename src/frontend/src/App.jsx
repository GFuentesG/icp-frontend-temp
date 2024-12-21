import Apptemp from "./Apptemp";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { AuthProvider } from "./context/AuthContext";

function App() {

  return (

    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Apptemp />
      </BrowserRouter>
    </AuthProvider >


  );
}

export default App;
