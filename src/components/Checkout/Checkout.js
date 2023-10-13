import { useState } from 'react';
import { useCartContext } from '../../Context/CartContext';
import '../Checkout/Checkout.css';
import { getFirestore, collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore';


export const Checkout = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirmacion, setEmailConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [ordenId, setOrdenId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const { cart, removeProduct, totalPrice, clearCart } = useCartContext();

  const manejadorFormulario = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError('No hay productos en el carrito');
      return;
    }

    setError('');

    if (!nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }
    if (!apellido.trim()) {
      setError('El apellido es requerido');
      return;
    }

    if (!telefono.trim() || isNaN(telefono) || telefono.length < 8) {
      setError('Introduce un número de teléfono válido');
      return;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!email.trim() || !emailRegex.test(email)) {
      setError('Introduce un correo electrónico válido');
      return;
    }

    if (email !== emailConfirmacion) {
      setError('Los campos de email no coinciden');
      return;
    }


    const total = totalPrice();
    const orden = {
      items: cart.map((producto) => ({
        id: producto.id,
        nombre: producto.title,
        cantidad: producto.quantity,
      })),
      total: total,
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
    };

    Promise.all(
      orden.items.map(async (productoOrden) => {
        const db = getFirestore();
        const productoRef = doc(db, 'products', productoOrden.id);

        const productoDoc = await getDoc(productoRef);
        const stockActual = productoDoc.data().stock;

        await updateDoc(productoRef, {
          stock: stockActual - productoOrden.cantidad,
        });
      })
    )
      .then(() => {
        const db = getFirestore();
        addDoc(collection(db, 'orders'), orden)
          .then((docRef) => {
            setOrdenId(docRef.id);
            removeProduct();
            clearCart();
          })
          .catch((error) => {
            console.log('Error en creacon de orden', error);
            setError('Error en orden');
          });
      })
      .catch((error) => {
        console.log('No se puede actualizar el stock', error);
        setError('No se actualizo el stock');
      });

    setNombre('');
    setApellido('');
    setTelefono('');
    setEmail('');
    setEmailConfirmacion('');
    setMensaje('');
  };

  return (
    <div className="checkout-container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-3 mb-5 bg-white rounded" style={{ maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4 fs-4">Completa el formulario para finalizar la compra</h2>

          {cart.map((producto) => (
            <div key={producto.id} className="mb-2 d-flex justify-content-between">
              <p>{producto.nombre} {producto.cantidad}</p>
              <p>{producto.precio}</p>
            </div>
          ))}

          <form onSubmit={manejadorFormulario}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input type="text" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Telefono</label>
              <input type="number" className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Confirmacion</label>
              <input type="email" className="form-control" value={emailConfirmacion} onChange={(e) => setEmailConfirmacion(e.target.value)} />
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            {ordenId && (
              <p className="text-success text-center">
                ¡Gracias por tu compra! <br /> Este es tu numero de orden: <br /> {ordenId}
              </p>
            )}

            <div className="text-center">
              <button className="btn btn-warning" type="submit">
                Finalizar Compra
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};