"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { isAuthenticated, removeTokens } from '@/lib/auth';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setActiveTab(path === "/" ? "home" : path.substring(1));
      const checkAuth = () => {
        setIsLoggedIn(isAuthenticated());
      };
      checkAuth();

      // Set up an interval to check auth status
      const interval = setInterval(checkAuth, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleLogout = () => {
    removeTokens();
    setIsLoggedIn(false);
    router.push("/signin");
  };

  return (
    <div className="w-full flex justify-center items-center pt-4 fixed top-0 z-50">
      <nav className="flex justify-between items-center w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-16 px-6 rounded-full bg-gradient-to-r from-purple-900/90 via-gray-900/95 to-rose-900/90 backdrop-blur-md shadow-lg">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-white flex items-center" onClick={() => setActiveTab("home")}>
            <span className="text-2xl font-bold">
              <span className="text-white">AI</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Kaatib</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-2 lg:space-x-4 justify-center">
          <NavLink href="/" label="Home" isActive={activeTab === "home"} onClick={() => setActiveTab("home")} />
          <NavLink href="/about" label="About" isActive={activeTab === "about"} onClick={() => setActiveTab("about")} />
          <NavLink href="/projects" label="Projects" isActive={activeTab === "projects"} onClick={() => setActiveTab("projects")} />
          <NavLink href="/skills" label="Skills" isActive={activeTab === "skills"} onClick={() => setActiveTab("skills")} />
          <NavLink href="/blog" label="Blog" isActive={activeTab === "blog"} onClick={() => setActiveTab("blog")} />
          <NavLink href="/experience" label="Experience" isActive={activeTab === "experience"} onClick={() => setActiveTab("experience")} />
          <NavLink href="/contact" label="Contact" isActive={activeTab === "contact"} onClick={() => setActiveTab("contact")} />
        </div>

        {/* Auth Button */}
        <div className="hidden md:flex items-center">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white px-4 py-2 rounded-full hover:bg-white/10 transition">
              Sign Out
            </button>
          ) : (
            <Link href="/signin" className="text-white px-4 py-2 rounded-full hover:bg-white/10 transition">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
            {isMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 w-[90%] rounded-2xl bg-gradient-to-r from-purple-900/90 via-gray-900/95 to-rose-900/90 backdrop-blur-md shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink href="/" label="Home" isActive={activeTab === "home"} onClick={() => { setActiveTab("home"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/about" label="About" isActive={activeTab === "about"} onClick={() => { setActiveTab("about"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/projects" label="Projects" isActive={activeTab === "projects"} onClick={() => { setActiveTab("projects"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/skills" label="Skills" isActive={activeTab === "skills"} onClick={() => { setActiveTab("skills"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/blog" label="Blog" isActive={activeTab === "blog"} onClick={() => { setActiveTab("blog"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/experience" label="Experience" isActive={activeTab === "experience"} onClick={() => { setActiveTab("experience"); setIsMenuOpen(false); }} />
            <MobileNavLink href="/contact" label="Contact" isActive={activeTab === "contact"} onClick={() => { setActiveTab("contact"); setIsMenuOpen(false); }} />

            {/* Auth Button for Mobile */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md">
                Sign Out
              </button>
            ) : (
              <Link href="/signin" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md">
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Desktop Link
function NavLink({ href, label, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
        isActive
          ? "text-white bg-white/10"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}

// Mobile Link
function MobileNavLink({ href, label, isActive, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block px-3 py-2 rounded-md text-base font-medium ${
        isActive
          ? "text-white bg-white/10"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}
