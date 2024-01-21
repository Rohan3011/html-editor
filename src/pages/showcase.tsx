import { getAllPosts } from "@/services/post";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { ArrowLeftCircleIcon } from "lucide-react";
import ShowcaseCard from "@/components/showcase-card";
import Loader from "@/components/loader";
import ShowCaseLoader from "@/components/loader";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

export default function ShowcasePage() {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  if (isLoading) return <ShowCaseLoader />;
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
