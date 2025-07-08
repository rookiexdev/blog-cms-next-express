"use client";

import { getAllBlogs } from "@/services";
import { Blog } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function HomePage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllBlogs()
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-50">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <section className="">
        <div className="container max-w-6xl p-6 mx-auto space-y-6 sm:space-y-12">
          {blogs.length > 0 &&
            blogs.slice(0, 1).map((blog, index) => (
              <article
                key={index}
                className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25 px-4 pt-12 pb-4"
              >
                <span className="inline-block rounded-sm bg-blue-600 p-2 text-white dark:bg-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </span>

                <Link href={`/blogs/${blog?.id}`}>
                  <h3 className="mt-0.5 text-lg font-medium text-gray-200 cursor-pointer">
                    {blog?.title}
                  </h3>
                </Link>
                <h5 className="mt-0.5 text-lg font-medium text-gray-600 ">
                  Author: {blog?.author?.username}
                </h5>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                  {blog?.content.slice(0, 150)} ...
                </p>

                <Link
                  href={`/blogs/${blog?.id}`}
                  className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 cursor-pointer"
                >
                  Read more
                  <span
                    aria-hidden="true"
                    className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                  >
                    &rarr;
                  </span>
                </Link>
              </article>
            ))}
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.length > 1 &&
              blogs.slice(1).map((blog, index) => (
                <article
                  key={index}
                  className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25"
                >
                  <span className="inline-block rounded-sm bg-blue-600 p-2 text-white dark:bg-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>

                  <Link href={`/blogs/${blog?.id}`}>
                    <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                      {blog?.title}
                    </h3>
                  </Link>
                  <h5 className="mt-0.5 text-lg font-medium text-gray-600 ">
                    Author: {blog?.author?.username}
                  </h5>

                  <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
                    {blog?.content.slice(0, 50)} ...
                  </p>

                  <Link
                    href={`/blogs/${blog?.id}`}
                    className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600"
                  >
                    Read more
                    <span
                      aria-hidden="true"
                      className="block transition-all group-hover:ms-0.5 rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </Link>
                </article>
              ))}
          </div>
          {/* <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600 cursor-pointer"
            >
              Load more blogs...
            </button>
          </div> */}
        </div>
      </section>
    </div>
  );
}
