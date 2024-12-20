import Apptemp from "./Apptemp";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {

  return (

    <BrowserRouter>
      <Navbar />
      <Apptemp />
    </BrowserRouter>
    
    
  );
}

export default App;
