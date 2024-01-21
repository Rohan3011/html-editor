import { Post } from "@/types";
import Link from "next/link";
import localFont from "next/font/local";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

const ShowcaseCard = ({ post }: { post: Post }) => {
  return (
    <div
      className={`flex flex-col border-2 rounded-xl overflow-hidden ${myFont.className}`}
    >
      <div className="flex-1 min-h-[400px] bg-white">
        <iframe
          srcDoc={post.body}
          title={post.filename}
          height="100%"
          width="100%"
        ></iframe>
      </div>

      <div className="px-4 py-2 h-[100px] border-neutral-500 bg-neutral-800 border-t-2 border-dashed">
        <div className="flex items-center justify-between">
          <p className="text-2xl">{post.filename}</p>

          <Link href={`/post/${post._id}`}>
            <p>show</p>
          </Link>
        </div>

        <p className="text-neutral-300">@{post.author}</p>
      </div>
    </div>
  );
};

export default ShowcaseCard;
