"use client";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-black text-gray-100 px-4 py-3 font-mono border-b border-[#30343B] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto">
        {/* <div className="binary-background"></div> */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo.ico" 
                alt="MALHAWK Logo" 
                className="w-10 h-10 object-contain rounded-lg border-2 border-[#00FF41] shadow-glow"
              />
              <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"/>
            </div>
            <h1 className="text-lg font-bold tracking-widest">
              <span className="text-cyan-400">Mal</span>
              <span className="text-[#00FF41]">Hawk</span>
            </h1>
          </div>

          <button 
            className="p-2 text-gray-400 hover:text-[#00FF41] transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center justify-between">
          <div className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="/logo.ico" 
                alt="MALHAWK Logo" 
                className="w-10 h-10 object-contain rounded-lg border-2 border-[#00FF41] shadow-glow"
              />
              <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg opacity-0 group-hover:opacity-40 transition-opacity duration-300"/>
            </div>
            <h1 className="text-lg font-bold tracking-widest">
              <span className="text-cyan-400">Mal</span>
              <span className="text-[#00FF41]">Hawk</span>
            </h1>
          </div>

          <nav className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-8">
              <li>
                <NavLink href="/about" pathname={pathname} label="About" />
              </li>
              <li>
                <NavLink href="/blog" pathname={pathname} label="Blog" isBlog />
              </li>
            </ul>
          </nav>

          <SocialLinks />
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 pt-4">
              <NavLink href="/about" pathname={pathname} label="About" mobile />
              <NavLink href="/blog" pathname={pathname} label="Blog" isBlog mobile />
              <div className="pt-3 border-t border-[#30343B]">
                <SocialLinks mobile />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function NavLink({ href, pathname, label, isBlog = false, mobile = false }) {
  const isActive = isBlog ? pathname.startsWith(href) : pathname === href;
  const activeColor = isBlog ? 'text-green-400' : 'text-[#00FF41]';
  
  return (
    <a
      href={href}
      className={`
        ${mobile ? 'block py-2 text-lg' : 'flex items-center gap-2'}
        tracking-widest transition-all duration-300
        ${isActive ? activeColor : 'text-gray-300 hover:text-[#00FF41]'}
      `}
    >
      {!mobile && (
        <span className={`${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          ∎
        </span>
      )}
      <span>{label}</span>
    </a>
  );
}

function SocialLinks({ mobile = false }) {
  return (
    <div className={`flex ${mobile ? 'justify-center space-x-6 py-2' : 'space-x-4'}`}>
      <a
        href="https://linkedin.com/in/joy-micheni"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#00FF41] transition-colors duration-300"
        aria-label="LinkedIn"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href="https://github.com/ooz-zoo"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#00FF41] transition-colors duration-300"
        aria-label="GitHub"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.793-.258.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      </a>
      {/* <a
        href="https://twitter.com/MalHawkRE"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-400 hover:text-[#00FF41] transition-colors duration-300"
        aria-label="Twitter"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a> */}
    </div>
  );
}