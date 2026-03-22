'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import chapters from '@/data/chapters.json';

const styleOverrides = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Telugu:wght@400;600;700&family=Ravi+Prakash&family=Playfair+Display:wght@700;900&display=swap');
  
  .telugu-serif { font-family: 'Noto Serif Telugu', serif; }
  .telugu-traditional { font-family: 'Ravi Prakash', serif; }
  .sanskrit-display { font-family: 'Playfair Display', serif; }
  
  .drop-cap::first-letter {
    font-size: 3.5rem;
    font-weight: bold;
    float: left;
    line-height: 2.5rem;
    padding-right: 0.5rem;
    color: #92400e;
  }
  
  .floral-divider {
    height: 2px;
    background: linear-gradient(to right, transparent, #b45309, transparent);
    position: relative;
    margin: 2rem 0;
  }
  
  .floral-divider::before {
    content: '✦';
    position: absolute;
    left: 50%;
    top: -0.8rem;
    color: #b45309;
    font-size: 1.5rem;
    transform: translateX(-50%);
  }
  
  .shloka-border {
    border: 3px solid;
    border-image: linear-gradient(135deg, #6366f1, #a855f7, #6366f1) 1;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.03), rgba(168, 85, 247, 0.03));
  }
  
  .page-fade-in {
    animation: fadeIn 0.6s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .nav-button-hover { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .nav-button-hover:hover { transform: translateX(8px); color: #b45309; }
`;

const getEpicData = (slug: string) => {
  const data = chapters as any;
  for (const epic of data.epics) {
    for (const parva of epic.parvas) {
      for (const chapter of parva.chapters) {
        if (chapter.slug === slug) {
          return { epic: epic.name, epicId: epic.id, parvaId: parva.id, parva: parva.name, chapterId: chapter.id, chapter: chapter.name, verses: chapter.verses || [], allEpics: data.epics };
        }
      }
    }
  }
  return { epic: 'శ్రీమద్రామాయణము', epicId: 'ramayana', parvaId: 'bala-kanda', parva: 'బాలకాండము', chapterId: 1, chapter: 'మొదటి అధ్యాయము', verses: [], allEpics: [] };
};

export default function EpicReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const epicData = useMemo(() => getEpicData(slug), [slug]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedParvas, setExpandedParvas] = useState<Set<string>>(new Set([epicData.parvaId]));
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const readChapters = ['ramayana-bala-1', 'ramayana-bala-2'];
  const currentChapter = slug;

  const toggleParva = (parvaId: string) => {
    const newExpanded = new Set(expandedParvas);
    if (newExpanded.has(parvaId)) {
      newExpanded.delete(parvaId);
    } else {
      newExpanded.add(parvaId);
    }
    setExpandedParvas(newExpanded);
  };

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
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{styleOverrides}</style>
      
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-300 flex flex-col`}>
        
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b-2 z-40 shadow-lg page-fade-in`}>
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>{epicData.chapter}</h1>
              <div className="flex gap-3 items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-gray-100 border-gray-300 text-gray-900 focus:ring-blue-500'}`}
                  />
                </div>
                <button onClick={handleShare} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-gray-100 text-blue-900 hover:bg-gray-200'}`}>
                  📤
                </button>
                <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' : 'bg-gray-100 text-blue-900 hover:bg-gray-200'}`}>
                  {isDarkMode ? '☀️' : '🌙'}
                </button>

                <div className={`flex gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <button onClick={() => setFontSize(prev => Math.max(14, prev - 1))} className={`p-1 rounded ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`} title="A−"><span className="text-sm">A</span></button>
                  <span className={`px-2 text-xs font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>{fontSize}</span>
                  <button onClick={() => setFontSize(prev => Math.min(22, prev + 1))} className={`p-1 rounded ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`} title="A+"><span className="text-sm">A</span></button>
                </div>

                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <select className={`bg-transparent text-sm font-medium outline-none ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>
                    <option value="telugu">తెలుగు</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          
          <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-r-2`}>
            <div className="p-6 max-h-full overflow-y-auto">
              <h3 className={`font-bold mb-6 text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-900'}`}>📚 Chapters</h3>
              
              <nav className="space-y-4">
                {epicData.allEpics.map((epic: any) => (
                  <div key={epic.id}>
                    <div className={`font-bold text-sm mb-3 uppercase tracking-wider ${epicData.epicId === epic.id ? (isDarkMode ? 'text-blue-300' : 'text-blue-900') : (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>{epic.name}</div>
                    <div className="space-y-2 ml-2">
                      {epic.parvas.map((parva: any) => (
                        <div key={parva.id}>
                          <button onClick={() => toggleParva(parva.id)} className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between text-sm font-semibold ${epicData.parvaId === parva.id ? (isDarkMode ? 'bg-blue-700 text-white shadow-lg' : 'bg-blue-100 text-blue-900 shadow-lg') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-200')}`}>
                            <span>▶ {parva.name}</span>
                            <span className={`text-xs transition-transform ${expandedParvas.has(parva.id) ? 'rotate-90' : ''}`}>▶</span>
                          </button>
                          {expandedParvas.has(parva.id) && (
                            <div className="ml-4 space-y-1 mt-1">
                              {parva.chapters.map((chapter: any) => (
                                <Link key={chapter.id} href={`/read/${chapter.slug}`} className={`block px-3 py-2 rounded-lg transition-all text-xs font-semibold ${epicData.chapterId === chapter.id ? (isDarkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-gradient-to-r from-blue-400 to-purple-400 text-white font-bold shadow-lg') : (isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')}`}>
                                  {chapter.id}. {chapter.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`hidden lg:flex absolute -left-12 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-r-lg ${isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-white text-blue-900'} hover:shadow-lg transition-all border border-gray-300 items-center justify-center`}>
            {sidebarOpen ? '◀' : '▶'}
          </button>

          <main className="flex-1 px-6 py-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              {epicData.verses && epicData.verses.length > 0 ? (
                epicData.verses.map((verse: any, idx: number) => (
                  <article key={verse.id} className={`mb-12 ${idx > 0 ? 'mt-12' : ''}`}>
                    <div className={`shloka-border rounded-lg p-8 mb-8 ${isDarkMode ? 'border-purple-700 bg-gray-800' : 'border-purple-300 bg-purple-50'}`}>
                      <p className={`sanskrit-display text-xl leading-relaxed text-center ${isDarkMode ? 'text-purple-200' : 'text-purple-900'}`}>{verse.shloka}</p>
                    </div>
                    <p className={`italic text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>"{verse.translation}"</p>
                    <div className={`h-1 rounded-full ${isDarkMode ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'}`}></div>
                    <div className={`mt-8 telugu-serif leading-relaxed drop-cap ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ fontSize: `${fontSize}px` }}>
                      <p>{verse.meaning}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="telugu-serif text-lg">ఈ అధ్యాయానికి వచనాలు ఇంకా జోడించబడలేదు।</p>
                  <p className="text-sm mt-2">Coming soon...</p>
                </div>
              )}
            </div>
          </main>
        </div>

        <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t-2`}>
          <div className="px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-4xl mx-auto">
              <button className={`nav-button-hover flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-semibold telugu-traditional ${isDarkMode ? 'bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white shadow-lg' : 'bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white shadow-lg'}`}>
                <span className="text-xl">&larr;</span>
                <span>మునుపటి అధ్యాయము</span>
              </button>
              <div className={`text-center telugu-serif text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="font-semibold text-base">{epicData.parva}</div>
                <div className="text-xs opacity-75 mt-1">{epicData.chapter}</div>
              </div>
              <button className={`nav-button-hover flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-semibold telugu-traditional ${isDarkMode ? 'bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-600 hover:to-purple-500 text-white shadow-lg' : 'bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 text-white shadow-lg'}`}>
                <span>తదుపరి అధ్యాయము</span>
                <span className="text-xl">&rarr;</span>
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
