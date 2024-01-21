import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Showcase from "@/components/showcase-section";

const inter = Inter({ subsets: ["latin"] });

import localFont from "next/font/local";
import Link from "next/link";
import { Plus, PlusCircleIcon } from "lucide-react";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

const NavConfig = [
  {
    title: "Showcase",
    link: "/showcase",
  },
  {
    title: "About",
    link: "/about",
  },
];

export default function Home() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileName.length > 2) router.push(`editor/${fileName}.html`);
    else {
      console.log(fileName);
    }
  };
  return (
    <>
      <main className={`flex min-h-screen flex-col ${myFont.className}`}>
        <nav
          className={`w-full flex justify-end items-center p-4  ${inter.className}`}
        >
          <ul className="ml-auto flex flex-col gap-3">
            {NavConfig.map((item, index) => (
              <Link key={index} href={item.link}>
                <li className="hover:underline transition-all underline-offset-4 cursor-pointer">
                  {item.title}
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <div className="p-24 ">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-[80px]">
            HTML Editor
            <br /> for <span className="animate-charcter">Lemon Yellow.</span>
          </h1>
          <form onSubmit={handleCreate} className="flex gap-10 pt-12">
            <div className="flex w-full max-w-xl bg-neutral-50 rounded-2xl overflow-hidden text-2xl shadow-[4px_4px_0px_1px_#353333] focus-within:shadow-[4px_4px_0px_1px_#313131] transition-all">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="filename"
                className="flex-1  h-full bg-transparent text-black outline-none px-8 border-r-2 border-dashed"
              />
              <div className="bg-neutral-400 px-8 py-4">
                <span className="text-black">.html</span>
              </div>
            </div>
            <button
              type="submit"
              className="flex justify-center items-center w-[200px] bg-neutral-950  rounded-2xl overflow-hidden text-2xl shadow-[4px_4px_0px_1px_#353333] border active:scale-95 transition-all duration-150 hover:opacity-90"
            >
              Create
              <Plus className="ml-2 w-6 h-6 text-center" />
            </button>
          </form>
        </div>
      </main>

      <Showcase />
    </>
  );
}
