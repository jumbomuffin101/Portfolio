export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Aryan Rawat</h1>
        <p className="text-lg md:text-2xl text-gray-400 mt-2">
          Front-End Developer • CS Student @ Stevens
        </p>
        <a
          href="#projects"
          className="mt-6 inline-block bg-white text-gray-900 font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition"
        >
          View My Work
        </a>
      </div>

      <Projects />
    </main>
  );
}
