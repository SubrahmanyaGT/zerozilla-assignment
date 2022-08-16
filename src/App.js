import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { Cart } from "./components/Cart";
import Profile from "./components/Profile";
import Product from "./components/Product";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]);
  return (
    <div className="App">
      <Router> 
        <Header cart={cart} setCart={setCart}/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/profile" element={<Profile cart={cart} />}></Route>
          <Route
            path="/product/:id"
            element={<Product setCart={setCart} cart={cart}/>}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
