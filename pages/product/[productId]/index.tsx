import { getLayout } from "@/pages/components/layout";
import Image from "next/image";
import { useRouter } from "next/router";

const ProductIddetail: React.FC = ({ productDetail }: any) => {
  const router = useRouter();
  const productId = router.query.productId;


  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-semibold">product {productId} Details</h1>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <article className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">{productDetail.name}</h2>
          <p className="text-gray-600">{productDetail.body}</p>
        </article>
        <section className="mt-6">
          <Image src={productDetail.image} alt={productDetail.name} width={500} height={500}/>
          <h2 className="text-center">Price : {productDetail.price}</h2>
         
        </section>
      </div>
    </div>
  );
};

(ProductIddetail as any).getLayout = getLayout;

export default ProductIddetail;


export async function getStaticPaths() {
  // Fetch a list of dynamic values for productId from your data source
  // For example, you can fetch a list of product IDs from an API
  const responseforPath = await fetch('http://localhost:4000/products/'); // Replace with your API endpoint
  const products = await responseforPath.json();
  
  // Generate paths for each product ID
  const paths = products.map((product: any) => ({
    params: { productId: product.id.toString() }, // productId should match the dynamic parameter name
  }));

  return {
    paths,
    fallback: false, // Set to 'false' if you want to return a 404 for undefined paths
  };
}

export async function getStaticProps(context: any) {
    
  const { params } = context;
  const productdetailsres = await fetch(`http://localhost:4000/products/${params.productId}`);
  const productDetail = await productdetailsres.json();
  
  return {
    props: {
      productDetail
    },
    revalidate : 10
  };
}
