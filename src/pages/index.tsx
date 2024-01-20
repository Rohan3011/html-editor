import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [fileName, setFileName] = useState("");
  const handleCreate = () => {
    router.push(`editor/${fileName}.html`);
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <div className="">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="bg-black/90"
        />
        <span>.html</span>
      </div>
      <Button onClick={handleCreate}>Create</Button>
    </main>
  );
}
