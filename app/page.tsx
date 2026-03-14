import Link from 'next/link';

export default function LaunchPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: 'url(/launch-page.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
      {/* Dark overlay for better button visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Button positioned on top of the image */}
      <div className="absolute bottom-8 right-8 z-10">
        <Link href="/contents">
          <button className="px-8 py-4 bg-orange-700 hover:bg-orange-800 text-white text-lg font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl">
            Go to Content →
          </button>
        </Link>
      </div>
    </main>
  );
}