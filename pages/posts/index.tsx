import Card from "@/components/card/card";
import { useRouter } from "next/router";
import { getLayout } from "../components/layout";

const PostList: React.FC = ({ posts }: any) => {
  const router = useRouter();
  return (
    <>
      <h1 className="text-center">PostList page</h1>
      <div className="flex flex-wrap justify-center">
        {posts.map((post: any) => (
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/posts/${post.id}`)}
            key={post.id}
          >
            <Card post={post} /> {/* Use the Card component */}
          </div>
        ))}
      </div>
    </>
  );
};

(PostList as any).getLayout = getLayout

export default PostList;

export async function getStaticProps(){
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();    

    return{
        props : {
            posts: data.slice(0 , 3)
        }
    }

}