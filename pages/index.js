import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white text-gray-900 font-sans min-h-screen px-6 md:px-24 py-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mb-24">
        <Image
          src="/profile.jpg"
          alt="Aryan Rawat"
          width={160}
          height={160}
          className="rounded-full border-4 border-gray-300 shadow-lg mb-6"
        />

        <h1 className="text-5xl font-bold mb-2">Aryan Rawat</h1>
        <h2 className="text-xl text-gray-600 mb-4">
          Software Engineer • Computer Science Student @ Stevens
        </h2>

        <p className="text-lg text-gray-700 max-w-2xl leading-relaxed mb-6">
          I&apos;m passionate about building clean, performant, and user-friendly software.
          From full-stack web apps to interactive tools, I love solving real-world problems through code.
        </p>

        <div className="flex gap-4">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={32} height={32} />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={32} height={32} />
          </Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Projects & Experience</h2>
        <div className="space-y-10">
          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">TruClaim – Software Engineering Intern</h3>
            <p className="text-gray-700 mt-2">
              Built a full-stack insurance claims platform using React and Flask. Designed dashboards,
              API-driven automation, and real-time data tools that reduced manual workload by 15+ hours/week.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">AI Chatbot – Java</h3>
            <p className="text-gray-700 mt-2">
              Developed an interactive chatbot with built-in games and natural language processing.
              Focused on simulated typing and realistic conversation flow to enhance user engagement.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Music Recommender – Python</h3>
            <p className="text-gray-700 mt-2">
              Personalized song recommendation system using user preferences and accuracy-optimized algorithms.
              Achieved over 90% match rate across test cases.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Weather App – Python</h3>
            <p className="text-gray-700 mt-2">
              Responsive weather forecasting app using the OpenWeatherMap API. Delivered real-time results
              with under 500ms response time and clear error handling.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
