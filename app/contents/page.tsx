import Link from 'next/link';
import chapters from '@/data/chapters.json';

export default function TableOfContents() {
  const chaptersData = chapters as any;

  return (
    <main className="min-h-screen bg-orange-50 p-6 md:p-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-orange-950 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          భారతీయ సనాతన గ్రంథాలు
        </h1>
        <p className="text-lg text-orange-700">రామాయణం, మహాభారతం డిజిటల్ అధ్యయనం</p>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">
        {chaptersData.epics.map((epic: any) => (
          <section key={epic.id}>
            <h2 className="text-3xl font-bold text-orange-900 mb-6 pb-2 border-b-4 border-amber-400" 
                style={{ fontFamily: "'Playfair Display', serif" }}>
              {epic.name}
            </h2>
            
            <div className="space-y-6">
              {epic.parvas.map((parva: any) => (
                <div key={parva.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-gradient-to-r from-orange-100 to-amber-100 px-6 py-4 border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold text-orange-900" style={{ fontFamily: "'Noto Serif Telugu', serif" }}>
                      {parva.name}
                    </h3>
                  </div>
                  
                  <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {parva.chapters.map((chapter: any) => (
                      <Link
                        key={chapter.id}
                        href={`/read/${chapter.slug}`}
                        className="block p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 hover:border-orange-400 transition-all"
                      >
                        <div className="text-sm text-orange-600 font-semibold">అధ్యాయం {chapter.id}</div>
                        <h4 className="text-lg font-semibold text-orange-900 mt-2" style={{ fontFamily: "'Noto Serif Telugu', serif" }}>
                          {chapter.name}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
