import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/posts", {
        title,
        content,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8"
      >
        <h1 className="text-3xl font-bold mb-6">
          Create Post
        </h1>

        <input
          type="text"
          placeholder="Title"
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          rows="10"
          placeholder="Content"
          className="w-full border p-3 rounded mb-4"
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
}