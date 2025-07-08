"use client";

import BlogDetailsPage from "@/app/components/BlogDetailsPage";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";

export default function BlogPost() {
  const params = useParams<{ blogId: string }>();

  return (
    <>
      <Navbar />
      <BlogDetailsPage blogId={params.blogId} />
    </>
  );
}
