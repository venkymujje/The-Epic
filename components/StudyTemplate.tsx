'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface StudyTemplateProps {
  children: React.ReactNode;
}

export default function StudyTemplate({ children }: StudyTemplateProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Mock data for dashboard - in real app, this would come from state/storage
  const readChapters = ['ramayana-bala-1', 'ramayana-bala-2']; // example
  const currentChapter = 'ramayana-bala-3'; // example

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Epic - Ramayana & Mahabharata',
        text: 'Check out this chapter from The Epic',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Side Menu - Dark Theme */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 shadow-2xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">The Epic</h2>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white text-2xl">
            ✕
          </button>
        </div>
        <nav className="p-6 space-y-3">
          <Link href="/contents" className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${pathname === '/contents' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            📚 Contents
          </Link>
          <Link href="/dashboard" className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${pathname === '/dashboard' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            📊 Dashboard
          </Link>
          <Link href="/" className={`flex items-center px-4 py-3 rounded-lg font-semibold transition-all ${pathname === '/' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}>
            🏠 Home
          </Link>
          <div className="pt-6 border-t border-gray-700 mt-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Ongoing Lesson</h3>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-lg">
              <p className="text-white font-semibold text-sm">{currentChapter}</p>
              <p className="text-blue-100 text-xs mt-2">Continue reading →</p>
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md border-b border-gray-200">
          <div className="px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900 text-2xl">
                ☰
              </button>
              <h1 className="text-3xl font-bold text-gray-900 hidden md:block">Overview</h1>
            </div>
            <div className="flex items-center space-x-4 flex-1 md:flex-none">
              <div className="relative flex-1 md:flex-none">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-48"
                />
                <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                  🔍
                </button>
              </div>
              <button onClick={handleShare} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                📤
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                🔔
              </button>
              <button className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full text-white font-bold flex items-center justify-center">
                P
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Section */}
        <section className="bg-white shadow-sm border-b border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600 font-semibold">Chapters Read</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">{readChapters.length}</p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                <div className="bg-blue-600 h-2 rounded-full w-1/3"></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600 font-semibold">Current Chapter</p>
              <p className="text-lg font-bold text-purple-600 mt-2">{currentChapter}</p>
              <p className="text-xs text-purple-500 mt-2">📚 Lesson 3/12</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600 font-semibold">Completion</p>
              <p className="text-3xl font-bold text-green-600 mt-2">33%</p>
              <p className="text-xs text-green-500 mt-2">Keep reading →</p>
            </div>
          </div>
        </section>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}