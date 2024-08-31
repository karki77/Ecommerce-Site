import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/Product";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
  <>
   <Header/>
   <main className="my-3">
     <Container>
       <Outlet/>
    </Container>
      </main>
    <Footer />
     <ToastContainer position="top-center"/>
  </>
  );
}

export default App;
 
