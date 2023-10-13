import React from 'react'
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore, doc, getDoc} from 'firebase/firestore';
import ItemDetail from '../ItemDetail/ItemDetail';


const ItemDetailContainer = () => {
  const [item, setItem] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
   const queryDb = getFirestore();
   const queryDoc = doc(queryDb, 'products', id);
   getDoc(queryDoc).then((res)=>setItem({id: res.id, ...res.data()}));
    }, [id])

  return (
    <div className='container'>
      <ItemDetail item={item}/>
    </div>
  )
}

export default ItemDetailContainer