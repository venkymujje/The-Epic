import StudyTemplate from '@/components/StudyTemplate';

export default function DashboardPage() {
  // Mock data
  const readChapters = ['ramayana-bala-1', 'ramayana-bala-2'];
  const totalChapters = 100; // example
  const progress = (readChapters.length / totalChapters) * 100;

  const cards = [
    {
      title: 'Reading Progress',
      bg: 'from-blue-50 to-blue-100',
      border: 'border-blue-300',
      accent: 'bg-blue-500',
      text: 'text-blue-900',
      icon: '📖',
      content: `${readChapters.length} of ${totalChapters} chapters`,
    },
    {
      title: 'Ongoing Lesson',
      bg: 'from-purple-50 to-purple-100',
      border: 'border-purple-300',
      accent: 'bg-purple-500',
      text: 'text-purple-900',
      icon: '🎓',
      content: 'ramayana-bala-3',
    },
    {
      title: 'Study Streak',
      bg: 'from-green-50 to-green-100',
      border: 'border-green-300',
      accent: 'bg-green-500',
      text: 'text-green-900',
      icon: '🔥',
      content: '5 days',
    },
    {
      title: 'Total Time',
      bg: 'from-pink-50 to-pink-100',
      border: 'border-pink-300',
      accent: 'bg-pink-500',
      text: 'text-pink-900',
      icon: '⏱️',
      content: '12 hours',
    },
    {
      title: 'Completion Rate',
      bg: 'from-indigo-50 to-indigo-100',
      border: 'border-indigo-300',
      accent: 'bg-indigo-500',
      text: 'text-indigo-900',
      icon: '✅',
      content: '33%',
    },
    {
      title: 'Favorites',
      bg: 'from-orange-50 to-orange-100',
      border: 'border-orange-300',
      accent: 'bg-orange-500',
      text: 'text-orange-900',
      icon: '⭐',
      content: '3 chapters',
    },
  ];

  return (
    <StudyTemplate>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, idx) => (
          <div key={idx} className={`bg-gradient-to-br ${card.bg} p-6 rounded-xl shadow-lg border-2 ${card.border} hover:shadow-xl transition-all`}>
            <div className="flex items-start justify-between mb-4">
              <h2 className={`text-lg font-bold ${card.text}`}>{card.title}</h2>
              <span className="text-2xl">{card.icon}</span>
            </div>
            <div className={`h-1 w-12 rounded-full ${card.accent} mb-4`}></div>
            <p className={`text-2xl font-bold ${card.text}`}>{card.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recently Read</h2>
        <div className="space-y-3">
          {readChapters.map((chapter, idx) => (
            <div key={idx} className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-300 flex items-center justify-between">
              <span className="text-gray-900 font-semibold">{chapter}</span>
              <span className="text-sm text-gray-600">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </StudyTemplate>
  );
}