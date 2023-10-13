import React, {useState} from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../Context/CartContext';
import './ItemDetail.css';


const ItemDetail = ({item}) => {

  const[goToCart, setGoToCart] = useState(false);
  const {addProduct} = useCartContext()
  const onAdd = (quantity) =>{
   setGoToCart(true);
   addProduct(item, quantity);
  }

  return (
    <div className='row'>
        <div className='col-md-4 offset-md-4 item-detail-container'>
            <img src={item.img} alt={item.title} />
            <h2 className="item-detail-title">{item.title}</h2>
            <p className="item-detail-description">{item.description}</p>
            <p className="item-detail-price"> $ {item.price}</p>
            <p className="item-detail-stock">Cantidad: {item.stock}</p>
            {goToCart 
                ? <Link className="item-detail-action-link btn btn-warning" to='/cart'>Terminar compra</Link> 
                : <ItemCount stock={10} initial={0} onAdd={onAdd} />
            }
        </div>
    </div>
)

}

export default ItemDetail