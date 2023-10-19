import { getLayout } from "@/pages/components/layout";
import { useRouter } from "next/router"

const ProductId : React.FC =()=>{
    const router =useRouter()
    const ProductId = router.query.productId;
    
    return(
        <>
        <h1 className="text-center"> page {ProductId} details</h1>
        </>
    )
}

(ProductId as any).getLayout = getLayout;

export default ProductId