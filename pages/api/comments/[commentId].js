import comments from "../../../data/comments/comments";

export default function apihandler(req, res) {
  const { commentId } = req.query;
  const commentIndex = comments.findIndex((comment) => comment.id === parseInt(commentId));
  
  if (commentIndex === -1) {
    return res.status(404).json({ error: `No comment found with commentId = ${commentId}` });
  }
  if(req.method === "DELETE"){
    comments.splice(commentIndex, 1);
    res.status(200).json(comments);
  } else if(req.method==="GET"){
    const comment = comments.find((comment)=> comment.id === parseInt(commentId));
    res.status(200).json(comment)
  }
}
