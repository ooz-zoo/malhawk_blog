"use client";
import { motion } from "framer-motion";
import { FaUserSecret } from "react-icons/fa";

export default function AboutPage() {
  return (
    <section className="text-gray-100 h-full px-8 py-12">
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
        <p> MALHAWK: Malware Analyst </p>
        <p className="animate-pulse-fast">$ cat /proc/mission</p>
        <p> Objective:  Learn <br></br> Share my journey and growth in malware analysis <br></br>and enjoy!!! </p>
      </div>
    </div>
  </motion.div>

  {/* Threat Analysis Section
  <motion.div
    className="grid md:grid-cols-1 gap-8 mb-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
  >
   
   
  </motion.div> */}

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
    <p>➊ PE header analysis</p>
    <p>➋ File Identification </p>
    <p>➌ Hashing and String Extraction</p>
    
  </div>

  </motion.div>
</section>
  );
}