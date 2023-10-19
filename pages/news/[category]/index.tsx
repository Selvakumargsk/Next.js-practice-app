import Card from "@/components/card/card";
import { getLayout } from "@/pages/components/layout";

const NewslistByCategory : React.FC = ({news , category}:any) =>{
    return(
        <>
        {
            news.map((n:any , index:any)=>{ 
                return <div key={index}><Card post={n} /></div> 
            })
        }
        </>
    )
}

(NewslistByCategory as any).getLayout = getLayout

export default NewslistByCategory;

export async function getServerSideProps(context:any) {
    const { params , req , res } = context;
    const { category } = params;
    const response = await fetch(`http://localhost:4000/news?category=${category}`);

    const data = await response.json();
    res.setHeader('set-Cookie' , ['name=Selva']  )
    
    
    return{
        props : {
            news :data ,
            category
    }
    
}
}