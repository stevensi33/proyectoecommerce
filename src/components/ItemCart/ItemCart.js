import React from 'react';
import { useCartContext } from '../../Context/CartContext';
import './ItemCart.css';



const ItemCart = ({ product }) => {
    const { removeProduct } = useCartContext();
    return (
        <div className='itemCart'>
            <img src={product.img} alt={product.title} />
            <div>
                <p>Producto: {product.title}</p>
                <p>Cantidad: {product.quantity}</p>
                <p>Precio unitario: $ {product.price}</p>
                <p>Subtotal: ${product.quantity * product.price}</p>
                <button onClick={() => removeProduct(product.id)}>Eliminar</button>
            </div>
        </div>
    )
}

export default ItemCart