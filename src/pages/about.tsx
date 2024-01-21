import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Showcase from "@/components/showcase-section";

const inter = Inter({ subsets: ["latin"] });

import localFont from "next/font/local";

const myFont = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
});

function AboutPage() {
  return (
    <main className={`flex min-h-screen flex-col ${myFont.className}`}>
      <h1>About </h1>
    </main>
  );
}

export default AboutPage;
