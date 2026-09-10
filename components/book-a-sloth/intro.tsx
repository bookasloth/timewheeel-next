import { Reveal } from "@/components/reveal";
import { bas, shots } from "@/lib/book-a-sloth";
import { Screenshot, ScreenshotCaption } from "./screenshot";

export function BasIntro() {
  const shot = shots.booking16x9;
  return (
    <section id="product" className="sx-sec">
      <div className="sx-container">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="sx-h2 mt-7">{bas.intro.title}</h2>
          <p
            className="sx-text mx-auto mt-6 max-w-2xl"
            style={{ fontSize: "1.08rem" }}
          >
            {bas.intro.body}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <figure className="mx-auto max-w-[920px]">
            <Screenshot
              src={shot.src}
              alt={bas.intro.shotAlt}
              width={shot.width}
              height={shot.height}
              url={bas.hero.shotUrl}
            />
            <ScreenshotCaption
              label={bas.intro.shotCaption}
              desc={bas.intro.shotDesc}
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}