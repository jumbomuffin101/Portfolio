import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-gray-50 text-gray-900 font-sans min-h-screen px-6 md:px-24 py-20">
      {/* Header Section */}
      <section className="flex flex-col items-center text-center mb-20">
        <div className="w-44 h-44 relative rounded-full overflow-hidden border-4 border-gray-300 shadow-lg mb-4">
          <Image src="/profile.jpg" alt="Aryan Rawat" fill className="object-cover" />
        </div>
        <h1 className="text-5xl font-bold mb-2 tracking-tight">Aryan Rawat</h1>
        <h2 className="text-lg text-gray-600 mb-6">
          Software Engineer • Computer Science Student @ Stevens
        </h2>
        <p className="text-md text-gray-700 max-w-2xl leading-relaxed mb-6">
          I&apos;m a developer passionate about crafting elegant web experiences and intelligent tools. I enjoy turning ideas into code and solving real-world problems with tech.
        </p>
        <div className="flex gap-4">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={32} height={32} className="hover:scale-110 transition-transform" />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={32} height={32} className="hover:scale-110 transition-transform" />
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-700 text-md leading-relaxed">
          I&apos;m currently pursuing a B.S. in Computer Science at Stevens Institute of Technology, where I&apos;ve built impactful projects ranging from AI-powered chatbots to interactive web apps. My work spans Python, Java, JavaScript, and modern frameworks like React and Next.js.
          I care deeply about building responsive, accessible, and beautiful UIs with clean, maintainable code.
        </p>
      </section>

      {/* Projects Section */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects & Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">TruClaim – Software Engineering Intern</h3>
            <p className="text-gray-700">
              Built a full-stack insurance claims platform using React and Flask. Designed dashboards,
              automated data flows, and real-time tools, reducing manual work by 15+ hours/week.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">AI Chatbot – Java</h3>
            <p className="text-gray-700">
              Designed an interactive chatbot with game logic and natural language capabilities. Simulated typing
              and smart responses enhanced engagement and UX.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Music Recommender – Python</h3>
            <p className="text-gray-700">
              Built a personalized music recommendation tool achieving over 90% accuracy, leveraging
              user behavior and content analysis.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold mb-2">Weather App – Python</h3>
            <p className="text-gray-700">
              Responsive, real-time weather app built using OpenWeatherMap API. Optimized for performance with less than 500ms load time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center mt-20 text-gray-500 text-sm">
        © {new Date().getFullYear()} Aryan Rawat • Built with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
