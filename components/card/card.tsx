// components/Card.tsx
interface cardProps {
    post : any
}

const Card = ({ post }:cardProps) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 m-4">
        <h2 className="text-xl font-semibold mb-2">{post.title ? post.title : post.category}</h2>
        <p>{post.body? post.body : post.heading}</p>
      </div>
    );
  };
  
  export default Card;
  