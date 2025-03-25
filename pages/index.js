import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-white to-gray-100 text-gray-900 font-sans min-h-screen px-6 md:px-24 py-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-24">
        <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-gray-300 shadow-xl mb-6">
          <Image
            src="/profile.jpg"
            alt="Aryan Rawat"
            fill
            className="object-cover"
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Aryan Rawat</h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-6">
          Software Engineer • Computer Science Student @ Stevens
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mb-8">
          I&apos;m passionate about building clean, performant, and user-friendly software.
          From full-stack web apps to interactive tools, I love solving real-world problems through code.
        </p>

        <div className="flex gap-6">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={36} height={36} className="hover:scale-110 transition-transform" />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={36} height={36} className="hover:scale-110 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects & Experience</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2">TruClaim – Software Engineering Intern</h3>
            <p className="text-gray-700">
              Built a full-stack insurance claims platform using React and Flask. Designed dashboards,
              API-driven automation, and real-time data tools that reduced manual workload by 15+ hours/week.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2">AI Chatbot – Java</h3>
            <p className="text-gray-700">
              Developed an interactive chatbot with built-in games and natural language processing.
              Focused on simulated typing and realistic conversation flow to enhance user engagement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Music Recommender – Python</h3>
            <p className="text-gray-700">
              Personalized song recommendation system using user preferences and accuracy-optimized algorithms.
              Achieved over 90% match rate across test cases.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
            <h3 className="text-xl font-semibold mb-2">Weather App – Python</h3>
            <p className="text-gray-700">
              Responsive weather forecasting app using the OpenWeatherMap API. Delivered real-time results
              with under 500ms response time and clear error handling.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
