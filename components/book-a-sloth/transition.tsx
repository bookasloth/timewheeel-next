import { Reveal } from "@/components/reveal";
import { bas } from "@/lib/book-a-sloth";

export function BasTransition() {
  return (
    <section className="sx-dark sx-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2 mt-7" style={{ whiteSpace: "pre-line" }}>
            {bas.transition.title}
          </h2>
          <p
            className="sx-text mx-auto mt-6 max-w-2xl"
            style={{ fontSize: "1.08rem" }}
          >
            {bas.transition.body}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <ol className="sx-examples mt-0">
            {bas.transition.examples.map((example) => (
              <li key={example} className="sx-example">
                {example}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}