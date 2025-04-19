'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onSignupClick: () => void;
}

export default function Navbar({ onSignupClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className={`text-2xl font-bold transition-colors ${
              scrolled ? 'text-[#27285C] group-hover:text-[#6366F1]' : 'text-white group-hover:text-white/80'
            }`}>
              Parevo
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { title: 'Ana Sayfa', href: '/' },
              { title: 'Hakkımızda', href: '/pages' },
              { title: 'Projeler', href: '/portfolio' },
              { title: 'Blog', href: '/blog' },
              { title: 'Hizmetler', href: '/shop' },
              { title: 'İletişim', href: '/elements' }
            ].map((item) => (
              <Link 
                key={item.title} 
                href={item.href}
                className={`relative transition-colors ${
                  scrolled 
                    ? 'text-gray-700 hover:text-[#6366F1]' 
                    : 'text-white/90 hover:text-white'
                } group`}
              >
                {item.title}
                <span className={`absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                  scrolled ? 'bg-[#6366F1]' : 'bg-white'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Sign Up Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={onSignupClick}
              className={`relative overflow-hidden px-6 py-2 rounded-lg group ${
                scrolled 
                  ? 'bg-[#6366F1] text-white hover:bg-[#4F46E5]' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              } transition-all duration-300`}>
              <span className="relative z-10">KAYIT OL</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
                scrolled ? 'text-gray-700 hover:text-[#6366F1]' : 'text-white hover:text-white/80'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-white/95 backdrop-blur-sm rounded-lg mt-2`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { title: 'Ana Sayfa', href: '/' },
              { title: 'Hakkımızda', href: '/pages' },
              { title: 'Projeler', href: '/portfolio' },
              { title: 'Blog', href: '/blog' },
              { title: 'Hizmetler', href: '/shop' },
              { title: 'İletişim', href: '/elements' }
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-[#6366F1] hover:bg-gray-50 rounded-md transition-colors"
              >
                {item.title}
              </Link>
            ))}
            <button 
              onClick={onSignupClick}
              className="w-full mt-4 bg-[#6366F1] text-white px-6 py-2 rounded-lg hover:bg-[#4F46E5] transition-colors">
              KAYIT OL
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 