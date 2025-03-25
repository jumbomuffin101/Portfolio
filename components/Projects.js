export default function Projects() {
    return (
      <section id="projects" className="py-20 bg-gray-100 text-gray-900 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Projects</h2>
  
          <div className="grid gap-6 md:grid-cols-2">
            {/* Project 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Weather Forecast App</h3>
              <p className="text-gray-600">
                A clean, real-time weather app built with Python and the OpenWeatherMap API. Supports any city with error-handling and fast response times.
              </p>
              <a
                href="https://github.com/yourusername/weather-app"
                target="_blank"
                className="text-blue-600 hover:underline mt-2 inline-block"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            </div>
  
            {/* Project 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">911 Calls Analysis</h3>
              <p className="text-gray-600">
                Analyzed emergency call data using Python and Pandas. Visualized call trends, locations, and categories with Matplotlib and Seaborn.
              </p>
              <a
                href="https://github.com/yourusername/911-analysis"
                target="_blank"
                className="text-blue-600 hover:underline mt-2 inline-block"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
  