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
    border-image: linear-gradient(135deg, #b45309, #d97706, #b45309) 1;
    background: linear-gradient(135deg, rgba(180, 83, 9, 0.03), rgba(217, 119, 6, 0.03));
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

  const toggleParva = (parvaId: string) => {
    const newExpanded = new Set(expandedParvas);
    if (newExpanded.has(parvaId)) {
      newExpanded.delete(parvaId);
    } else {
      newExpanded.add(parvaId);
    }
    setExpandedParvas(newExpanded);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <style>{styleOverrides}</style>
      
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-orange-50'} transition-colors duration-300`}>
        
        <header className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-orange-100 border-amber-300'} border-b-4 sticky top-0 z-40 shadow-lg page-fade-in`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-start mb-4">
              <div />
              <div className="flex gap-4 items-center">
                <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2 rounded-lg transition-all ${isDarkMode ? 'bg-amber-900 text-amber-300' : 'bg-orange-200 text-orange-700'} hover:scale-110`} title={isDarkMode ? 'Light Mode' : 'Night Mode'}>
                  {isDarkMode ? '☀️' : '🌙'}
                </button>

                <div className={`flex gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-orange-200'}`}>
                  <button onClick={() => setFontSize(prev => Math.max(14, prev - 1))} className={`p-1 rounded ${isDarkMode ? 'text-amber-300' : 'text-orange-700'}`} title="A−"><span className="text-sm">A</span></button>
                  <span className={`px-2 text-xs font-semibold ${isDarkMode ? 'text-amber-300' : 'text-orange-900'}`}>{fontSize}</span>
                  <button onClick={() => setFontSize(prev => Math.min(22, prev + 1))} className={`p-1 rounded ${isDarkMode ? 'text-amber-300' : 'text-orange-700'}`} title="A+"><span className="text-sm">A</span></button>
                </div>

                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-orange-200'}`}>
                  <select className={`bg-transparent text-sm font-medium outline-none ${isDarkMode ? 'text-amber-300' : 'text-orange-900'}`}>
                    <option value="telugu">తెలుగు</option>
                    <option value="english">English</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="text-center my-6">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className={`text-4xl ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>☸</span>
                <h1 className={`sanskrit-display text-5xl font-black tracking-wide ${isDarkMode ? 'text-amber-300' : 'text-orange-950'}`}>{epicData.epic}</h1>
                <span className={`text-4xl ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>☸</span>
              </div>
              <h2 className={`telugu-traditional text-2xl mt-4 ${isDarkMode ? 'text-amber-200' : 'text-orange-800'}`}>{epicData.parva} - {epicData.chapter}</h2>
              <div className={`mt-4 text-sm telugu-serif flex justify-center gap-2 ${isDarkMode ? 'text-amber-100' : 'text-orange-700'}`}>
                <a href="/" className="hover:text-amber-600">హోమ్</a>
                <span>/</span>
                <span>{epicData.parva}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex max-w-7xl mx-auto">
          
          <aside className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-orange-100 border-amber-300'} border-r-4`}>
            <div className="sticky top-20 p-6 max-h-[calc(100vh-100px)] overflow-y-auto">
              <h3 className={`telugu-traditional text-lg font-bold mb-6 ${isDarkMode ? 'text-amber-300' : 'text-orange-900'}`}>📚 పుస్తకాలు</h3>
              
              <nav className="space-y-4">
                {epicData.allEpics.map((epic: any) => (
                  <div key={epic.id}>
                    <div className={`font-bold text-sm mb-2 telugu-traditional ${epicData.epicId === epic.id ? (isDarkMode ? 'text-amber-300' : 'text-orange-900') : (isDarkMode ? 'text-amber-100' : 'text-orange-700')}`}>{epic.name}</div>
                    <div className="space-y-1 ml-2">
                      {epic.parvas.map((parva: any) => (
                        <div key={parva.id}>
                          <button onClick={() => toggleParva(parva.id)} className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${epicData.parvaId === parva.id ? (isDarkMode ? 'bg-amber-900 text-amber-100 shadow-lg' : 'bg-orange-300 text-orange-950 shadow-lg') : (isDarkMode ? 'text-amber-200 hover:bg-gray-700' : 'text-orange-800 hover:bg-orange-200')} telugu-serif text-sm`}>
                            <span className="font-semibold">▶ {parva.name}</span>
                            <span className={`text-xs transition-transform ${expandedParvas.has(parva.id) ? 'rotate-90' : ''}`}>▶</span>
                          </button>
                          {expandedParvas.has(parva.id) && (
                            <div className="ml-4 space-y-1 mt-1">
                              {parva.chapters.map((chapter: any) => (
                                <Link key={chapter.id} href={`/read/${chapter.slug}`} className={`block px-3 py-2 rounded-lg transition-all text-xs telugu-serif ${epicData.chapterId === chapter.id ? (isDarkMode ? 'bg-amber-800 text-amber-50' : 'bg-orange-400 text-orange-950 font-bold') : (isDarkMode ? 'text-amber-100 hover:bg-gray-700' : 'text-orange-700 hover:bg-orange-150')}`}>
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

          <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`absolute left-0 top-24 z-30 p-2 rounded-r-lg ${isDarkMode ? 'bg-gray-800 text-amber-300' : 'bg-orange-200 text-orange-900'} hover:shadow-lg transition-all`}>
            {sidebarOpen ? '◀' : '▶'}
          </button>

          <main className="flex-1 px-6 py-12 page-fade-in">
            <div className="max-w-3xl mx-auto">
              {epicData.verses && epicData.verses.length > 0 ? (
                epicData.verses.map((verse: any, idx: number) => (
                  <article key={verse.id} className={`mb-12 ${idx > 0 ? 'mt-12' : ''}`}>
                    <div className={`shloka-border rounded-lg p-8 mb-8 ${isDarkMode ? 'border-amber-700 bg-gray-800' : 'border-amber-600'}`}>
                      <p className={`sanskrit-display text-xl leading-relaxed text-center ${isDarkMode ? 'text-amber-200' : 'text-orange-900'}`}>{verse.shloka}</p>
                    </div>
                    <p className={`italic text-sm leading-relaxed mb-6 ${isDarkMode ? 'text-amber-100' : 'text-orange-700'}`}>"{verse.translation}"</p>
                    <div className="floral-divider"></div>
                    <div className={`mt-8 telugu-serif leading-relaxed drop-cap ${isDarkMode ? 'text-amber-50' : 'text-orange-900'}`} style={{ fontSize: `${fontSize}px` }}>
                      <p>{verse.meaning}</p>
                    </div>
                  </article>
                ))
              ) : (
                <div className={`text-center py-12 ${isDarkMode ? 'text-amber-200' : 'text-orange-700'}`}>
                  <p className="telugu-serif text-lg">ఈ అధ్యాయానికి వచనాలు ఇంకా జోడించబడలేదు।</p>
                  <p className="text-sm mt-2">Coming soon...</p>
                </div>
              )}
              <div className="floral-divider my-12"></div>
            </div>
          </main>
        </div>

        <footer className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-orange-100 border-amber-300'} border-t-4 sticky bottom-0`}>
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center max-w-3xl mx-auto">
              <button className={`nav-button-hover flex items-center gap-3 px-6 py-4 rounded-lg transition-all ${isDarkMode ? 'bg-amber-900 hover:bg-amber-800 text-amber-100' : 'bg-orange-300 hover:bg-orange-400 text-orange-950'} font-semibold telugu-traditional`}>
                <span className="text-xl">&larr;</span>
                <span>మునుపటి అధ్యాయము</span>
              </button>
              <div className={`text-center telugu-serif text-sm ${isDarkMode ? 'text-amber-300' : 'text-orange-900'}`}>
                <div className="font-semibold">{epicData.parva}</div>
                <div className="text-xs opacity-75">{epicData.chapter}</div>
              </div>
              <button className={`nav-button-hover flex items-center gap-3 px-6 py-4 rounded-lg transition-all ${isDarkMode ? 'bg-amber-900 hover:bg-amber-800 text-amber-100' : 'bg-orange-300 hover:bg-orange-400 text-orange-950'} font-semibold telugu-traditional`}>
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
