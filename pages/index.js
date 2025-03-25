import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 md:px-20 py-24 bg-white text-gray-900 font-sans">
      <div className="max-w-3xl">
        {/* Profile Image */}
        <Image
          src="/profile.jpg"
          alt="Aryan Rawat"
          width={64}
          height={64}
          className="rounded-full mb-6"
        />

        {/* Intro */}
        <h1 className="text-4xl font-bold mb-2">Aryan Rawat</h1>
        <h2 className="text-xl text-gray-600 mb-4">
          Software Engineer • Computer Science Student @ Stevens
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          I&apos;m a computer science student passionate about front-end development,
          building practical tools, and solving real-world problems through
          clean, efficient code.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          <Link href="https://github.com/jumbomuffin101" target="_blank">
            <Image src="/github-app.png" alt="GitHub" width={32} height={32} />
          </Link>
          <Link href="https://www.linkedin.com/in/aryan-rawat-bbb0a6276/" target="_blank">
            <Image src="/linkedin-app.png" alt="LinkedIn" width={32} height={32} />
          </Link>
        </div>
      </div>
    </main>
  );
}
