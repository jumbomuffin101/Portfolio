import Image from "next/image";
import Projects from "../components/Projects";
import Link from "next/link";
import profilePic from "../public/unnamed (1).jpg"; // Make sure this file is moved to public/

export default function Home() {
  return (
    <main className="bg-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center px-6 py-20 max-w-6xl mx-auto">
        {/* Image */}
        <div className="w-40 h-40 md:w-60 md:h-60 relative rounded-full overflow-hidden border-4 border-gray-900 shadow-lg">
          <Image src={profilePic} alt="Aryan Rawat" layout="fill" objectFit="cover" />
        </div>

        {/* Text */}
        <div className="mt-6 md:mt-0 md:ml-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold">Aryan Rawat</h1>
          <p className="mt-2 text-xl md:text-2xl text-gray-600">
            Software Engineer • Computer Science Student @ Stevens
          </p>

          <div className="mt-4 flex justify-center md:justify-start space-x-4">
            <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
              <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
            </Link>
            <Link href="https://github.com/jumbomuffin101" target="_blank">
              <Image src="/github.svg" alt="GitHub" width={32} height={32} />
            </Link>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <Projects />
    </main>
  );
}
