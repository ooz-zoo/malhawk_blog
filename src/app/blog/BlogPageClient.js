"use client";

import { motion } from "framer-motion";
import { FiCalendar, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function BlogPageClient({ initialPosts }) {
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
        Blogs
      </motion.h1>

      <div className="space-y-8">
        {initialPosts?.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block group relative border border-[#30343B] rounded-lg p-6 hover:border-[#00FF41] transition-all duration-300 bg-gradient-to-r from-[#1A1C22]/50 to-[#2A2D32]/50"
            >
              {/* Stack on mobile; row from sm+ */}
              <div className="flex flex-col sm:flex-row items-start gap-6">
                {post.image && (
                  <div className="w-32 h-32 shrink-0 relative rounded-lg overflow-hidden border border-[#30343B]">
                    <img
                      src={post.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Text column must be allowed to shrink */}
                <div className="flex-1 min-w-0 w-full">
                  <h2 className="text-2xl font-bold text-gray-100 font-mono mb-2 break-words whitespace-normal max-w-full overflow-visible">
                    {post.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1 shrink-0">
                      <FiCalendar className="text-cyan-400" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    {post.tags?.length > 0 && (
                      <span className="flex flex-wrap items-center gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-full bg-[#00FF41]/10 text-[#00FF41] text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>

                  {post.excerpt && (
                    <p className="text-gray-300 break-all whitespace-normal max-w-full overflow-visible [overflow-wrap:anywhere]">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-[#00FF41]">
                    <span className="text-sm">Read Analysis</span>
                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity bg-[#00FF41]/10" />
            </Link>
          </motion.div>
        ))}
      </div>

      {(!initialPosts || initialPosts.length === 0) && (
        <div className="text-center py-12 border border-dashed border-[#30343B] rounded-lg">
          <p className="text-gray-400 mb-2">No analysis found</p>
          <p className="text-sm text-gray-500">$ make new_analysis</p>
        </div>
      )}
    </motion.section>
  );
}
