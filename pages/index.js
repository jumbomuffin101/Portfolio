import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 md:px-24 py-24 bg-white text-gray-900 font-sans">
      <div className="max-w-3xl">
        {/* Profile Image */}
        <div className="mb-6">
          <Image
            src="/profile.jpg"
            alt="Aryan Rawat"
            width={60}
            height={60}
            className="rounded-full shadow-md border border-gray-300"
          />
        </div>

        {/* Name */}
        <h1 className="text-4xl font-bold mb-2">Aryan Rawat</h1>

        {/* Title */}
        <h2 className="text-xl text-gray-600 mb-6">
          Software Engineer • Computer Science Student @ Stevens
        </h2>

        {/* About Paragraph */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          I&apos;m a computer science student passionate about front-end development,
          building practical tools, and solving real-world problems through
          clean, efficient code.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4 mb-16">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={28} height={28} />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={28} height={28} />
          </Link>
        </div>

        {/* Projects / Experience Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Projects & Experience</h2>
          <ul className="space-y-8">
            <li>
              <h3 className="text-xl font-semibold">TruClaim – Software Engineering Intern</h3>
              <p className="text-gray-700 mt-2">
                Built a full-stack insurance claims platform using React and Flask. Designed dashboards, API-driven automation,
                and real-time data tools that improved claims processing and reduced manual workload by 15+ hours/week.
              </p>
            </li>

            <li>
              <h3 className="text-xl font-semibold">AI Chatbot – Java</h3>
              <p className="text-gray-700 mt-2">
                Created an interactive chatbot with integrated games, real-time score tracking, and natural language
                processing. Enhanced user experience through simulated typing, feedback-based design, and replay functionality.
              </p>
            </li>

            <li>
              <h3 className="text-xl font-semibold">Music Recommender System – Python</h3>
              <p className="text-gray-700 mt-2">
                Developed a Python system that analyzed user preferences and achieved 90%+ accuracy using optimized
                algorithms and fast data handling. Reduced processing time by 15% over baseline.
              </p>
            </li>

            <li>
              <h3 className="text-xl font-semibold">Weather Forecasting App – Python</h3>
              <p className="text-gray-700 mt-2">
                Real-time weather app using OpenWeatherMap API with fast, reliable performance. Built with
                responsive UI and robust error handling, achieving sub-500ms response time.
              </p>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
