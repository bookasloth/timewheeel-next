import "./belief.css";

const beliefs = [
  {
    name: "Time should never be wasted.",
    body: "Every tap removed is a minute given back.",
  },
  {
    name: "Your craft is the valuable part.",
    body: "The machinery around it isn't your job — that part is ours.",
  },
  {
    name: "Creators should own their audience.",
    body: "Your customers are yours. Always.",
  },
  {
    name: "Automation should feel invisible.",
    body: "The best tool is the one you forget is there.",
  },
  {
    name: "Calm beats hustle.",
    body: "Work slower. Earn smarter.",
  },
  {
    name: "You keep what you earn.",
    body: "0% commission. Your money is yours.",
  },
];

export function BasBelief() {
  return (
    <section className="belief">
      <div className="belief__container">
        <h2 className="belief__title">What we believe.</h2>
        <div className="belief__grid">
          {beliefs.map((belief) => (
            <div className="belief__card" key={belief.name}>
              <h3 className="belief__name">{belief.name}</h3>
              <p className="belief__body">{belief.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}