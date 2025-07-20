"use client";
import { motion } from "framer-motion";
import { FaUserSecret } from "react-icons/fa";

export default function AboutPage() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-[#00FF41] font-mono"
      >
        About
      </motion.h1>

      {/* Terminal Header */}
      <motion.div
        className="glitch-container mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="terminal-window bg-black/80 p-6 rounded-lg border border-green-400 shadow-xl">
          <div className="flex gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          
          <div className="font-mono text-green-400 space-y-2">
            <p className="animate-pulse-fast">$ whoami</p>
            <div className="space-y-3 text-gray-300">
            <p> My Name is Joy. I am a security software developer and a Malware Analyst. I enjoy the treasure-hunt and puzzle-like challenges that come with analyzing malware.
I’m also exploring exploit development (for ethical purposes) and plan to dive deeper into it along the way.  </p> </div>
            <div className="font-mono text-green-400 space-y-2">
            <p className="animate-pulse-fast">$ cat /proc/mission</p> </div>
            <div className="space-y-3 text-gray-300">
            <p> This blog documents my security research journey, with a focus on malware analysis.</p> 
            <p>My goal is to understand how attackers think, share insights, build more resilient software, and enjoy the process!</p>
            
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Learning Path */}
      <motion.div
        className="system-scan bg-black/40 p-6 rounded-lg border border-yellow-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-ping" />
          <h3 className="text-2xl font-bold text-yellow-500">Current Learning Pipeline</h3>
        </div>
        <div className="space-y-3 text-gray-300">
          <p>➊ In-depth Static Analysis</p>
        </div>
      </motion.div>
    </motion.section>
  );
}