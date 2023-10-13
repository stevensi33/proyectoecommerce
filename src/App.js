import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from "../src/components/NavBar/NavBar";
import ItemListContainer from "../src/components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "../src/components/ItemDetailContainer/ItemDetailContainer";
import Error404 from "../src/components/Error404";
import CartProvider from '../src/Context/CartContext';
import Cart from "./components/Cart/Cart";
import {Checkout} from '../src/components/Checkout/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
        <div >    
           
          <BrowserRouter >
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path={"/"} element={<ItemListContainer />} />
              <Route path={"/category/:id"} element={<ItemListContainer />} />
              <Route path={"/item/:id"} element={<ItemDetailContainer/>} />
              <Route path={"/cart"} element={<Cart/>} />
              <Route path={"/checkout"} element={<Checkout/>} />
              <Route path={"*"} element={<Error404 />} />
            </Routes>
            </CartProvider>           
          </BrowserRouter>
          


         
        </div>
  );
}

export default App;