import { getAllPosts } from "@/services/post";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { ArrowLeftCircleIcon } from "lucide-react";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

export default function ShowcasePage() {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  if (isLoading) return <p>loading...</p>;
  return (
    <div className="p-24">
      <div>
        <Link href="/">
          <button className="flex gap-2 items-center justify-center mb-8 text-neutral-100">
            <ArrowLeftCircleIcon className="w-6 h-6" />
            <span className="hover:underline transition-all underline-offset-4 cursor-pointer">
              back to home
            </span>
          </button>
        </Link>
      </div>
      <div className="relative ">
        <h1 className={`text-4xl mb-10 ${myFont.className}`}>Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-8">
          {data?.map((post) => (
            <ShowcaseCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

const ShowcaseCard = ({ post }: { post: Post }) => {
  return (
    <div className="flex flex-col border-2 rounded-xl overflow-hidden">
      <div className="flex-1 min-h-[400px] bg-white">
        <iframe
          srcDoc={post.body}
          title={post.filename}
          height="100%"
          width="100%"
        ></iframe>
      </div>

      <div className="px-4 py-2 h-[100px] border-neutral-500 bg-neutral-800 border-t-2 border-dashed">
        <p>{post.filename}</p>

        <p>{post.author}</p>
        <Link href={`/post/${post._id}`}>
          <p>show</p>
        </Link>
      </div>
    </div>
  );
};
