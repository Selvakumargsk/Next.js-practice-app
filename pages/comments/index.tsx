import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLayout } from "../components/layout";

interface Comment {
  id: number;
  author: string;
  text: string;
}



const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]); // Specify the type as Comment[]
  const [newComment, setNewComment] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("/api/comments");
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addComment = async () => {
    try {
      const response = await axios.post("/api/comments", {
        author: "New Author",
        comment: newComment,
      });
      const data = response.data;

      setComments((prevComments) => [...prevComments, data]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost= async(commentId: any) => {
    try{
      const response = await axios.delete(`/api/comments/${commentId}`);
      setComments(response.data);
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-semibold">Post Comments</h1>
        <div className="flex">
          <input
            type="text"
            className="border rounded-l-md px-4 py-2"
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-md"
            onClick={addComment}
          >
            Add Comment
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6">
        {comments.map((comment:any) => (
          <div key={comment.id} onClick={(e)=>{
            e.stopPropagation();
            router.push(`/comments/${comment.id}`)
            }} className="bg-white rounded-lg shadow-md p-4">
            <div className="space-y-4">
              <p className="text-gray-800 font-semibold">{comment.author}</p>
              <p className="text-gray-600">{comment.comment}</p>
              <button onClick={(e)=>{
                e.stopPropagation();
                handleDeletePost(comment.id)
              }} className="bg-red-500 p-1.5 text-[#fff] rounded-lg font-semibold">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

(Comments as any).getLayout = getLayout

export default Comments;
