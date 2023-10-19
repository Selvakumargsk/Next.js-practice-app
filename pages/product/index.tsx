import Card from "@/components/productCard/card";
import { useRouter } from "next/router";
import { getLayout } from "../components/layout";
import { useSelector } from 'react-redux'
import { RootState } from "@/store/store";

const ProductList: React.FC = ({ products }: any) => {
  const router = useRouter();
  const Cart = useSelector((state: RootState) => state.cart.value);
  
  console.log(products , 'jvcdcv' , Cart);
  return (
    <>
      <h1 className="text-center">productList page</h1>
      <div className="flex flex-wrap justify-center">
        {products.map((product: any) => (
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
            key={product.id}
          >
            <Card product={product} /> {/* Use the Card component */}
          </div>
        ))}
      </div>
    </>
  );
};

(ProductList as any).getLayout = getLayout

export default ProductList;

export async function getStaticProps(){
    const response = await fetch('http://localhost:4000/products/');
    const data = await response.json();    

    return{
        props : {
            products: data
        } ,
        revalidate : 10
    }

}