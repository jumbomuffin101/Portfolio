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
        <div className="flex items-center gap-4">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={28} height={28} />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={28} height={28} />
          </Link>
        </div>
      </div>
    </main>
  );
}
