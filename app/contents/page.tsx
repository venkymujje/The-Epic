import Link from 'next/link';
import chaptersData from '@/data/chapters.json';

interface Chapter {
  slug: string;
  title: string;
  preview: string;
  category: string;
}

const chapters: Chapter[] = chaptersData as Chapter[];

export default function TableOfContents() {
  return (
    <main className="min-h-screen bg-orange-50 p-6 md:p-12 font-serif">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4">
          భారతీయ సనాతన సాహిత్య గ్రంథమాల
        </h1>
        <p className="text-lg text-gray-700">రామాయణం మరియు మహాభారతం డిజిటల్ పఠనం</p>
      </header>

      <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {/* Ramayanam Section */}
        <section>
          <h2 className="text-2xl font-bold text-orange-700 border-b-2 border-orange-200 mb-4 pb-2">
            శ్రీమద్రామాయణము
          </h2>
          <div className="space-y-4">
            {chapters
              .filter((c) => c.category === 'Ramayanam')
              .map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
          </div>
        </section>

        {/* Mahabharatham Section */}
        <section>
          <h2 className="text-2xl font-bold text-red-800 border-b-2 border-red-200 mb-4 pb-2">
            శ్రీమహాభారతము
          </h2>
          <div className="space-y-4">
            {chapters
              .filter((c) => c.category === 'Mahabharatham')
              .map((chapter) => (
                <ChapterCard key={chapter.slug} chapter={chapter} />
              ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// Simple Card Component for each chapter
function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <Link href={`/chapter/${chapter.slug}`}>
      <div className="block p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold text-gray-900">{chapter.title}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{chapter.preview}</p>
      </div>
    </Link>
  );
}
