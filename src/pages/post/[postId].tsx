import { getPostById } from "@/services/post";
import { Post } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

function ShowcaseProject() {
  const router = useRouter();
  const postId = router.query.postId;
  const { data, isLoading } = useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId as string),
  });
  if (isLoading) return <p>loading...</p>;
  console.log(data);
  return (
    <div className="flex-1 border h-screen w-screen overflow-y-auto bg-white ">
      <iframe
        srcDoc={data?.body}
        title={data?.filename}
        height="100%"
        width="100%"
      ></iframe>
    </div>
  );
}

export default ShowcaseProject;
