"use client"
import React from "react";
import { Ticker } from './test';
import Image from 'next/image'
import { motion } from "framer-motion";

export default function Home() {
  const items = ["Item 1", "Item 2", "Item 3", "Item 4"];
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 app">
    <h1>React Ticker Example</h1>
    <motion.div whileHover={{scaleY:.5}} >
      <Image
                src="/Doom.png"
                alt="Vercel Logo"
                className="dark:invert"
                width={300}
                height={300}
                priority
              />
    </motion.div>
      <Ticker items={items} />
    </main>
  )
}




