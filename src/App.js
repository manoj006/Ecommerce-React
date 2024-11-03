import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { CartContext } from './components/menu/menu';
import { useState } from 'react';
import { ToastContainer } from "react-toastify"
import Home from "./components/home/home"
import Pagenotfound from "./components/pagenotfound/pagenotfound"
import Menu from './components/menu/menu';
import Navbar from './components/navbar/navbar';
import AboutUs from './components/aboutus/aboutus'
import ContactUs from './components/contactus/contactus';
import Cart from './components/cart/cart'
import Address from './components/address/address';


function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false)
  return (
    <>
      
      <CartContext.Provider value={{ cartItems, setCartItems, isClicked, setIsClicked }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </CartContext.Provider>

    </>

  )
}

export default App
