
import React from 'react';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import ItemCart from '../ItemCart/ItemCart';
import './Cart.css';

const Cart = () => {
  const { cart, totalPrice } = useCartContext();

  if (cart.length === 0) {
    return (
      <div className="empty-cart-container">
        <p>No hay productos agregados al carrito</p>
        <Link to="/" className="shopLink">Ir a comprar</Link>
      </div>
    );
  }

  return (
    <>
      {cart.map((product) => (
        <ItemCart key={product.id} product={product} />
      ))}
      <p>total: $ {totalPrice()}</p>

      <Link to="/checkout">
        {' '}
        <button className="btn-total">Finalizar Compra</button>
      </Link>
    </>
  );
};

export default Cart;