"use client";
import './styles/globals.css';
import Footer from './components/footer';
import Sidebar from './components/navbar';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <html lang="en">
      <body className={`${theme} flex flex-col min-h-screen bg-[#1A1D21] text-white`}>
        <Sidebar theme={theme} setTheme={setTheme} />
        <main className="flex-grow w-full px-4 sm:px-6 md:max-w-6xl md:mx-auto md:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}