import React, { useEffect, useState } from "react";
import './ItemCount.css';


const ItemCount = ({ initial, stock, onAdd }) => {
    const [count, setCount] = useState(parseInt(initial));
    const decrease = () => {
        setCount(count - 1);
    };

    const increase = () => {
        setCount(count + 1);
    };

    useEffect(() => {
        setCount(parseInt(initial));
    }, [initial]);

    return (
        <div className="counter">
            <div>
                <button disabled={count <= 1} onClick={decrease}>
                    -
                </button>
                <span style={{ margin: '0 10px' }}>{count}</span>  {/* Un pequeño margen para separar los elementos */}
                <button disabled={count >= stock} onClick={increase}>
                    +
                </button>
            </div>
            <div>
                <button 
                    disabled={stock <= 0 || count <= 0} 
                    onClick={() => count > 0 && onAdd(count)}
                    className="add-to-cart-btn"
                >
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
};

export default ItemCount;