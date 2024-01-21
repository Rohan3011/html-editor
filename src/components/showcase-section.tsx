import { getAllPosts } from "@/services/post";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import localFont from "next/font/local";
import { ArrowUpRight } from "lucide-react";
import ShowcaseCard from "./showcase-card";
import ShowCaseLoader from "./loader";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

function Showcase() {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getAllPosts,
  });
  if (isLoading) return <ShowCaseLoader />;
  return (
    <div className="p-24">
      <div className="relative ">
        <h1 className={`text-4xl mb-10 ${myFont.className}`}>Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 md:gap-8">
          {data?.slice(0, 4)?.map((post) => (
            <ShowcaseCard key={post._id} post={post} />
          ))}
        </div>
        <div className="from-neutral-950 absolute left-0 right-0 z-10 flex h-[550px] -translate-y-[500px] justify-center items-center bg-gradient-to-t">
          <Link href="/showcase">
            <button
              className={`flex justify-center items-center  px-4 h-16 bg-neutral-950 rounded-2xl overflow-hidden text-2xl shadow-[4px_4px_0px_1px_#353333] border active:scale-95 transition-all duration-150 uppercase  ${myFont.className}`}
            >
              Show More
              <ArrowUpRight className="ml-2 w-8 h-8" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Showcase;
