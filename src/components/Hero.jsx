export default function Hero() {
  return (
    <section className="chapter chapter--intro" id="home" tabIndex="-1" aria-labelledby="hero-title">
      <div className="hero shell">
        <div className="hero-copy">
          <h1 id="hero-title" className="entrance">Hi, I'm Aryan.</h1>
          <p className="hero-subheading entrance">I build software.</p>
          <p className="hero-role entrance">Incoming Software Engineer Intern @ JPMorgan Chase</p>
          <div className="hero-actions entrance">
            <a className="primary-link" href="#projects">View Projects <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure className="hero-portrait entrance">
          <img
            src={`${process.env.PUBLIC_URL || ""}/headshot.jpg`}
            alt="Portrait of Aryan Rawat"
            width={200}
            height={200}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  );
}
