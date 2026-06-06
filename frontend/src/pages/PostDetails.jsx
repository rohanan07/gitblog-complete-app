import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../api/axios";

export default function PostDetails() {
  const { id } = useParams();

  const [post, setPost] =
    useState(null);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const res =
        await api.get(`/posts/${id}`);

      setPost(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-5xl font-bold mb-4">
        {post.title}
      </h1>

      <p className="text-gray-500 mb-8">
        By {post.author_name}
      </p>

      <div className="text-lg whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
}