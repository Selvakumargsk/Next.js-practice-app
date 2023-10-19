import Card from "@/components/card/card";
import { useRouter } from "next/router";
import { getLayout } from "../components/layout";

const NewsList: React.FC = ({ newslist }: any) => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center">newsList page</h1>
      <div className="flex flex-wrap justify-center">
        {newslist.map((news: any) => (
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/news/${news.category}`)}
            key={news.id}
          >
            <Card post={news} /> {/* Use the Card component */}
          </div>
        ))}
      </div>
    </>
  );
};

(NewsList as any).getLayout = getLayout

export default NewsList;

export async function getServerSideProps(){
    const response = await fetch('http://localhost:4000/news');
    const data = await response.json();    

    return{
        props : {
          newslist: data
        }
    }

}