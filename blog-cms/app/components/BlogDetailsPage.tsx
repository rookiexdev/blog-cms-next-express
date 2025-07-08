import { getBlog } from "@/services";
import { Blog } from "@/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "./Loading";

export default function BlogDetailsPage({ blogId }: { blogId: string }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(blogId);
        const data = await res.json();
        if (res.ok) {
          setBlog(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch blog");
      }
    };
    fetchBlog();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-50">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
      <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25 px-4 pt-12 pb-4">
        <div className="container max-w-4xl px-10 py-6 mx-auto rounded-lg shadow-sm ">
          <div className="mt-3 flex flex-col justify-center gap-4">
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-4xl font-bold hover:underline"
            >
              {blog?.title}
            </a>
            <div className="flex items-center gap-2">
              <span className="text-1xl dark:text-gray-600">
                {blog?.author.username}
              </span>
              <span className="text-1xl dark:text-gray-600"> | </span>
              <span className="text-1xl dark:text-gray-600">
                {new Date(blog?.createdAt!).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-2 text-medium text-gray-500 dark:text-gray-400">
              {blog?.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
