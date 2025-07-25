import { getPostBySlug, getPosts } from '../../lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { JSDOM } from 'jsdom';



export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return notFound();


  const toc = [];
  const dom = new JSDOM(post.content);
  const doc = dom.window.document;
  const headings = doc.querySelectorAll('h1, h2, h3');

  headings.forEach((heading, idx) => {
    const text = heading.textContent;
    const id = `toc-${idx}-${text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    heading.id = id;
    toc.push({ text, id, level: heading.tagName });
  });

  post.content = doc.body.innerHTML;

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 py-8 gap-8">
      {/* Mobile TOC Dropdown */}
      {toc.length > 0 && (
        <details className="lg:hidden mb-6 bg-[#16191F] border border-[#2a2d33] rounded-lg p-4">
          <summary className="text-[#00FF41] font-bold cursor-pointer">
            Table of Contents
          </summary>
          <ul className="mt-3 space-y-2 pl-4">
          
          {toc.map(item => {
            const level = parseInt(item.level[1]);
            const paddingClass = level === 2 ? 'pl-0' : level === 3 ? 'pl-4' : 'pl-8';
            
            return (
              <li key={item.id} className={`${paddingClass} py-1`}>
                <a 
                  href={`#${item.id}`} 
                  className="hover:text-[#00FF41] transition block text-sm"
                >
                  {item.text}
                </a>
              </li>
            );
          })}
          </ul>
        </details>
      )}

  

      {/* Desktop TOC */}
      
      {toc.length > 0 && (
        <div className="hidden lg:block relative w-64 flex-shrink-0">
          <aside 
            className="w-64 p-9 text-sm bg-[#16191F] border border-[#2a2d33] rounded-lg shadow-md fixed"
            style={{ height: 'fit-content', top: 'calc(6rem + 35px)' }}
          >
            <h2 className="text-[#00FF41] font-bold mb-3">Table of Contents</h2>
            <ul className="space-y-2">
              
            {toc.map(item => {
              const level = parseInt(item.level[1]);
              const paddingClass = level === 2 ? 'pl-0' : level === 3 ? 'pl-4' : 'pl-8';
              
              return (
                <li key={item.id} className={`${paddingClass} py-1`}>
                  <a 
                    href={`#${item.id}`} 
                    className="hover:text-[#00FF41] transition block text-sm"
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
            </ul>
          </aside>
        </div>
      )}

       {/* Blog Content */}
      <article className="flex-1 font-mono bg-[#0F1115] text-white rounded-2xl shadow-lg border border-[#1f1f1f] p-6">
        {/* Post Header */}
        <header className="mb-10 border-b border-gray-700 pb-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#00FF41] leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <FiCalendar className="text-cyan-400" />
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {post.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-2 py-1 rounded-full bg-[#00FF41]/10 text-[#00FF41] text-xs font-semibold tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Post Content */}
        

        <div
  className="prose prose-invert max-w-none text-lg leading-relaxed break-words [overflow-wrap:anywhere] [word-break:break-word]"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>


        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="mt-12 inline-flex items-center gap-2 text-[#00FF41] hover:underline hover:opacity-80"
        >
          <FiArrowLeft /> Back to Blog
        </Link>
      </article>
    </div>
  );
}