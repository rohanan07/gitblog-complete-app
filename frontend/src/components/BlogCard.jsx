import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-2xl font-bold mb-2">
        {post.title}
      </h2>

      <p className="text-gray-600 mb-4 line-clamp-3">
        {post.content}
      </p>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          By {post.author_name}
        </span>

        <Link
          to={`/posts/${post.id}`}
          className="text-blue-600 font-semibold"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}