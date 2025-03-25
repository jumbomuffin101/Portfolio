import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-gray-100 text-gray-900 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* TruClaim */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">TruClaim – Software Engineering Intern</h3>
            <p className="text-gray-600">
              Built frontend and backend infrastructure for an insurance claims startup using React and Flask. Developed interactive dashboards, real-time processing, and automated tools that reduced manual work by 15+ hours/week and improved system performance by 30%.
            </p>
          </div>

          {/* AI Chatbot */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">AI Chatbot – Java</h3>
            <p className="text-gray-600">
              Developed an interactive Java-based chatbot featuring games like Rock-Paper-Scissors, Number Guessing, and Trivia with real-time score tracking and natural language processing for realistic conversations.
            </p>
          </div>

          {/* Music Recommender */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Music Recommender System – Python</h3>
            <p className="text-gray-600">
              Created a Python recommendation system that achieved 90%+ accuracy across 50+ user profiles, using efficient data structures and optimized algorithms for fast performance.
            </p>
          </div>

          {/* Weather App */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">Weather Forecasting App – Python</h3>
            <p className="text-gray-600">
              Developed a clean and responsive weather app using the OpenWeatherMap API. Integrated robust error handling and optimized API usage for consistent real-time data under 500ms response time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
