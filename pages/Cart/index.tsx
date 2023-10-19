import Card from "@/components/productCard/card";
import { useRouter } from "next/router";
import { getLayout } from "../components/layout";
import { useSelector } from 'react-redux'
import { RootState } from "@/store/store";
import Link from "next/link";

const ProductCart: React.FC = () => {
  const router = useRouter();
  const Cart = useSelector((state: RootState) => state.cart.value);
  
  return (
    <>
      <h1 className="text-center">Product Cart</h1>
      <div className="flex flex-wrap justify-center">
        {!Cart.length && <div className="flex flex-col items-center"><div>No Products Available in your cart</div> <div><Link className="no-underline	" href='/product'>shop now</Link></div></div>}
        {Cart.map((product: any) => (
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
            key={product.id}
          >
            <Card product={product} /> 
          </div>
        ))}
      </div>
    </>
  );
};

(ProductCart as any).getLayout = getLayout

export default ProductCart;