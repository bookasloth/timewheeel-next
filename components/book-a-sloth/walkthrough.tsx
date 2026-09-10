import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

export function BasWalkthrough() {
  return (
    <section className="sx-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2 mt-7" style={{ whiteSpace: "pre-line" }}>
            {bas.walkthrough.title}
          </h2>
          <p
            className="sx-text mx-auto mt-6 max-w-2xl"
            style={{ fontSize: "1.08rem" }}
          >
            {bas.walkthrough.body}
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="sx-walk">
            <ol className="sx-walk-steps">
              {bas.walkthrough.steps.map((step, i) => (
                <li key={i} className={`sx-walk-step${i === 0 ? " is-active" : ""}`}>
                  <span className="sx-walk-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="sx-walk-name">{step.name}</p>
                    <p className="sx-text">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="sx-walk-card sx-walk-panel">
              <h3 className="sx-walk-panel-title">
                {bas.walkthrough.title}
              </h3>
              <ul className="sx-walk-services">
                {bas.walkthrough.services.map((service, i) => (
                  <li
                    key={i}
                    className={`sx-walk-service${i === 1 ? " is-selected" : ""}`}
                  >
                    <span className="sx-walk-service-name">{service.name}</span>
                    <span className="sx-walk-service-price">{service.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}