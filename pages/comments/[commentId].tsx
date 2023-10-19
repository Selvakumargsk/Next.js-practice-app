// pages/comments/[commentId].js

import { useRouter } from 'next/router';
import axios from 'axios';

const CommentPage = ({ comment }: any) => {
  const router = useRouter();
  const { commentId } = router.query;

  // Ensure that the comment data is available before rendering
  if (!comment) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Comment #{comment.id}</h1>
      <p>{comment.comment}</p>
    </div>
  );
};

export async function getServerSideProps(context : any) {
  const { commentId } = context.query;
  

  // Fetch the comment data based on the commentId
  try {
    const response = await axios.get(`http://localhost:3000/api/comments/${commentId}`);
    const comment = response.data;
    
    return {
      props: { comment },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { comment: null }, // Handle the case when the comment is not found
    };
  }
}

export default CommentPage;
