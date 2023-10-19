import { AddToCart } from "@/store/Slices/cart/cartSlice";
import { RootState } from "@/store/store";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

// components/Card.tsx
interface cardProps {
  product: any
}

const Card = ({ product }: cardProps) => {
  const dispatch = useDispatch();
  const Cart = useSelector((state: RootState) => state.cart.value);
  const { pathname } = useRouter();

  const existingItem = Cart.find(p => p.id == product.id);
  const [quantity, setQuantity] = useState<number>(existingItem ? existingItem.quantity : 1);

  const addToCart = (e: React.MouseEvent, singleproduct: any) => {
    e.stopPropagation();
    (singleproduct instanceof Object) ? dispatch(AddToCart({...singleproduct , quantity}))  : console.log('error');    
  }  

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-4 text-center ">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <Image width={300} height={300} src={product.image} alt={product.name} />
      <h2 className="text-center">Price : {product.price}</h2>
      {pathname == "/product" &&
        <>
          <div className="flex items-center justify-center bg-white border rounded p-2">
            <button disabled={quantity == 1} className="bg-red-500 text-white p-2 rounded-l" onClick={(e) => { setQuantity(quantity - 1); e.stopPropagation() }}>-</button>
            <span className="px-4">{quantity}</span>
            <button className="bg-red-500 text-white p-2 rounded-r" onClick={(e) => { setQuantity(quantity + 1); e.stopPropagation() }}>+</button>
          </div>        
          <button disabled={existingItem ? true : false} className="p-2 rounded bg-red-500 text-white mx-auto" onClick={(e: any) => addToCart(e, product)}>{existingItem ? "Cart Product" : "Add to Cart"}</button>
        </>}
    </div>
  );
};

export default Card;
