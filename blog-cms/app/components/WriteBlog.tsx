"use client";

import { useRouter } from "next/navigation";
import { createBlog } from "@/services";
import toast from "react-hot-toast";
import { useRef } from "react";

export default function WriteBlog() {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value;
    const content = contentRef.current?.value;

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      const res = await createBlog(title, content);

      if (res.status === 401) {
        toast.error("You must be logged in to write a blog.");
        router.push("/login");
      } else {
        const data = await res.json();
        if(res.ok){
          toast.success(data.message);
          router.push("/");
        }
      }
    } catch (err) {
      toast.error("Failed to submit. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Write a Blog</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Blog title"
          className="border rounded p-2"
          ref={titleRef}
        />
        <textarea
          placeholder="Blog content"
          ref={contentRef}
          rows={10}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
