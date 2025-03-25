export default function Projects() {
    return (
      <section className="px-6 md:px-20 py-12 bg-white text-gray-900">
        <h2 className="text-2xl font-semibold mb-6">Projects</h2>
  
        <ul className="space-y-8">
          <li>
            <h3 className="text-xl font-bold">TruClaim – React, Flask</h3>
            <p className="text-gray-700 mt-2">
              Developed the frontend and backend infrastructure for an insurance claims startup. Built dashboards,
              automated data processing, and reduced manual effort by over 15 hours/week.
            </p>
          </li>
  
          <li>
            <h3 className="text-xl font-bold">AI Chatbot – Java</h3>
            <p className="text-gray-700 mt-2">
              Java-based chatbot with built-in games and natural language processing for realistic human-like interaction.
              Used typing delays and contextual responses for better UX.
            </p>
          </li>
  
          <li>
            <h3 className="text-xl font-bold">Music Recommender – Python</h3>
            <p className="text-gray-700 mt-2">
              Personalized music recommendation tool that achieved 90%+ accuracy by analyzing 50+ user profiles.
              Built using dictionaries, lists, and file I/O.
            </p>
          </li>
  
          <li>
            <h3 className="text-xl font-bold">Weather Forecast App – Python, OpenWeatherMap API</h3>
            <p className="text-gray-700 mt-2">
              Clean and fast weather app showing real-time data with error handling and consistent sub-500ms response times.
            </p>
          </li>
        </ul>
      </section>
    );
  }
  