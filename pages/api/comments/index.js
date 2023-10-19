// API handler (api/comments.js)
import comments from "../../../data/comments/comments";

export default function apihandler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(comments);
  } else if (req.method === "POST") {
    const newComment = req.body;
    newComment.id = generateUniqueCommentId();
    comments.push(newComment);
    res.status(201).json(newComment);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

function generateUniqueCommentId() {
  const existingIds = comments.map((comment) => comment.id);
  let newId = 1;
  while (existingIds.includes(newId)) {
    newId++;
  }
  return newId;
}
