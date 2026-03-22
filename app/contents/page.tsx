import Link from 'next/link';
import chapters from '@/data/chapters.json';
import StudyTemplate from '@/components/StudyTemplate';

export default function TableOfContents() {
  const chaptersData = chapters as any;

  const colors = [
    { bg: 'from-blue-50 to-blue-100', border: 'border-blue-300', accent: 'bg-blue-500', text: 'text-blue-900', title: 'text-blue-700' },
    { bg: 'from-purple-50 to-purple-100', border: 'border-purple-300', accent: 'bg-purple-500', text: 'text-purple-900', title: 'text-purple-700' },
    { bg: 'from-green-50 to-green-100', border: 'border-green-300', accent: 'bg-green-500', text: 'text-green-900', title: 'text-green-700' },
    { bg: 'from-pink-50 to-pink-100', border: 'border-pink-300', accent: 'bg-pink-500', text: 'text-pink-900', title: 'text-pink-700' },
    { bg: 'from-indigo-50 to-indigo-100', border: 'border-indigo-300', accent: 'bg-indigo-500', text: 'text-indigo-900', title: 'text-indigo-700' },
  ];

  return (
    <StudyTemplate>
      <div className="max-w-6xl mx-auto space-y-8">
        {chaptersData.epics.map((epic: any, epicIdx: number) => {
          const colorSet = colors[epicIdx % colors.length];
          return (
            <section key={epic.id}>
              <h2 className={`text-2xl font-bold ${colorSet.title} mb-6 pb-3 border-b-4 border-gray-300`}>
                {epic.name}
              </h2>
              
              <div className="space-y-6">
                {epic.parvas.map((parva: any, parvaIdx: number) => {
                  const parvaColor = colors[(epicIdx + parvaIdx) % colors.length];
                  return (
                    <div key={parva.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                      <div className={`bg-gradient-to-r ${parvaColor.bg} px-6 py-4 border-l-4 ${parvaColor.border}`}>
                        <h3 className={`text-xl font-bold ${parvaColor.title}`}>
                          {parva.name}
                        </h3>
                      </div>
                      
                      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {parva.chapters.map((chapter: any, chapterIdx: number) => {
                          const chapterColor = colors[(epicIdx + parvaIdx + chapterIdx) % colors.length];
                          return (
                            <Link
                              key={chapter.id}
                              href={`/read/${chapter.slug}`}
                              className={`block p-4 bg-gradient-to-br ${chapterColor.bg} rounded-lg border-2 ${chapterColor.border} hover:shadow-lg transition-all hover:scale-105 transform duration-200`}
                            >
                              <div className={`text-sm ${chapterColor.title} font-bold`}>
                                అధ్యాయం {chapter.id}
                              </div>
                              <h4 className={`text-lg font-semibold ${chapterColor.text} mt-2`}>
                                {chapter.name}
                              </h4>
                              <div className={`mt-3 h-1 rounded-full ${chapterColor.accent}`}></div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </StudyTemplate>
  );
}
