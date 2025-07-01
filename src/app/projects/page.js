"use client"
import { motion } from 'framer-motion';
import { FiGithub, FiTerminal, FiLock, FiCode } from 'react-icons/fi';

export default function ProjectsPage() {
  const projects = [
    { 
      title: "PE Header Inspector", 
      date: "2024-03-01",
      description: "Advanced PE header analysis tool extracting rich metadata, hashes, and structural anomalies from executable files.",
      tech: ["Python", "pefile", "YARA"],
      type: "Tool Development",
      repo: "https://github.com/MalHawk-Analysis/pe-inspector",
      status: "Active"
    },
    { 
      title: "UPX Unpacker Analysis", 
      date: "2024-04-01",
      description: "Detailed walkthrough of static/dynamic analysis on UPX-packed malware sample (SHA256: a1b2c3...)",
      tech: ["Ghidra", "x64dbg", "Cuckoo Sandbox"],
      type: "Malware Analysis",
      repo: null,
      status: "Published"
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-12 text-[#00FF41] font-mono"
      >
         Projects
      </motion.h1>

      <div className="space-y-8">
        {projects.map((project, index) => (
          <motion.a
            key={index}
            href={project.repo || '#'}
            target={project.repo ? "_blank" : "_self"}
            rel="noopener noreferrer"
            className="block group relative border border-[#30343B] rounded-lg p-6 hover:border-[#00FF41] transition-all duration-300 bg-gradient-to-r from-[#1A1C22]/50 to-[#2A2D32]/50"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <FiTerminal className="text-[#00FF41] text-xl" />
                  <h2 className="text-2xl font-bold text-gray-100 font-mono">
                    {project.title}
                  </h2>
                  <span className="text-sm px-2 py-1 rounded-full bg-[#00FF41]/10 text-[#00FF41]">
                    {project.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <FiLock className="text-cyan-400" />
                    {new Date(project.date).toLocaleDateString('en-US', {
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric'
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiCode className="text-cyan-400" />
                    {project.type}
                  </span>
                </div>

                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-[#30343B] text-gray-300 border border-[#40444B]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {project.repo && (
                <FiGithub 
                  className="text-2xl text-gray-400 hover:text-[#00FF41] transition-colors ml-4" 
                />
              )}
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity bg-[#00FF41]/10" />
          </motion.a>
        ))}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="text-center py-12 border border-dashed border-[#30343B] rounded-lg">
          <p className="text-gray-400 mb-2">No active projects found</p>
          <p className="text-sm text-gray-500">$ make new_project</p>
        </div>
      )}
    </section>
  );
}