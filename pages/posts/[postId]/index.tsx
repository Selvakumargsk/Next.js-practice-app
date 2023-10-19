import { getLayout } from "@/pages/components/layout";
import { useRouter } from "next/router";

const PostId: React.FC = ({ post , postDetail }: any) => {
  const router = useRouter();
  const postId = router.query.postId;


  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-semibold">Post {postId} Comments</h1>
        </div>
      </header>
      <div className="container mx-auto p-4">
        <article className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold">{postDetail.title}</h2>
          <p className="text-gray-600">{postDetail.body}</p>
        </article>
        <section className="mt-6">
          <h2 className="text-2xl font-semibold">Comments</h2>
          <ul className="mt-4 space-y-4 w-[80vw] m-auto">
            {post.map((comment: any) => (
              <li
                key={comment.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <h3 className="text-lg font-semibold">{comment.name}</h3>
                <p className="text-gray-600">{comment.body}</p>
                <p className="text-blue-500">{comment.email}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

(PostId as any).getLayout = getLayout

export default PostId;


export async function getStaticPaths() {
  // Fetch a list of dynamic values for postId from your data source
  // For example, you can fetch a list of post IDs from an API
  const responseforPath = await fetch('https://jsonplaceholder.typicode.com/posts/'); // Replace with your API endpoint
  const posts = await responseforPath.json();
  
  // Generate paths for each post ID
  const paths = posts.map((post: any) => ({
    params: { postId: post.id.toString() }, // postId should match the dynamic parameter name
  }));

  return {
    paths,
    fallback: false, // Set to 'false' if you want to return a 404 for undefined paths
  };
}

export async function getStaticProps(context: any) {
    
  const { params } = context;
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`);

  const data = await response.json(); 

  const postdetailsres = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
 
  const postDetail = await postdetailsres.json();
  

  return {
    props: {
      post: data,
      postDetail
    },
  };
}
