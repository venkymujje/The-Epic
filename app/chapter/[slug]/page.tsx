import StudyTemplate from '@/components/StudyTemplate';

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return (
    <StudyTemplate>
      <h1 className="text-2xl font-bold">Chapter: {resolvedParams.slug}</h1>
      <p>Chapter content for {resolvedParams.slug} will be displayed here.</p>
    </StudyTemplate>
  );
}