import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../api/axios";

export default function Dashboard() {
  const [posts, setPosts] =
    useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const res =
        await api.get("/posts/my-posts");

      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);

      fetchMyPosts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-bold">
          My Posts
        </h1>

        <Link
          to="/create-post"
          className="bg-green-600 text-white px-5 py-3 rounded"
        >
          Create Post
        </Link>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded shadow flex justify-between"
          >
            <h2 className="font-bold">
              {post.title}
            </h2>

            <div className="flex gap-3">
              <Link
                to={`/edit-post/${post.id}`}
                className="text-blue-600"
              >
                Edit
              </Link>

              <button
                onClick={() =>
                  deletePost(post.id)
                }
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}