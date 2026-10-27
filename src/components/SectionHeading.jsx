export default function SectionHeading({ number, label, title, children }) {
  return (
    <div className="section-heading">
      <div className="section-kicker mono">
        <span className="blue">{number} /</span> {label}
      </div>
      <div className="heading-row">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
