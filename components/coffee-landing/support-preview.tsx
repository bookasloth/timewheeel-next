import { Check, Coffee, Heart, CupSoda } from "lucide-react";
import { type CoffeeData } from "@/lib/coffee";
import { Reveal } from "@/components/reveal";
import { CfButton } from "./button";

const optionIcons = { coffee: Coffee, cup: CupSoda, heart: Heart } as const;

export function CfSupportPreview({ data }: { data: CoffeeData }) {
  const { supportPreview } = data;
  const { creator } = supportPreview;

  return (
    <section className="cf-sec cf-support" id="experience">
      <div className="cf-container">
        <div className="cf-sec-head">
          <Reveal>
            <span className="cf-kicker">{supportPreview.kicker}</span>
            <h2 className="cf-h cf-h--light">{supportPreview.title}</h2>
            <p className="cf-lede cf-lede--light">{supportPreview.body}</p>
          </Reveal>
        </div>

        <div className="cf-support-visual">
          <Reveal>
            <div className="cf-sp-profile">
              <div className="cf-sp-profile-header">
                <span className="cf-sp-avatar">{creator.initials}</span>
                <div>
                  <div className="cf-sp-name">{creator.name}</div>
                  <div className="cf-sp-role">{creator.role}</div>
                </div>
              </div>

              <div className="cf-sp-options">
                {creator.options.map((option) => {
                  const Icon = optionIcons[option.icon as keyof typeof optionIcons];
                  return (
                    <div className="cf-sp-option" key={option.name}>
                      <span className="cf-sp-option-left">
                        <span className="cf-sp-option-icon">
                          <Icon size={15} strokeWidth={2} aria-hidden="true" />
                        </span>
                        <span className="cf-sp-option-name">{option.name}</span>
                      </span>
                      <span className="cf-sp-option-price">{option.price}</span>
                    </div>
                  );
                })}
              </div>

              <div className="cf-sp-message-box">
                <textarea
                  className="cf-sp-input"
                  rows={2}
                  readOnly
                  placeholder={supportPreview.message}
                  aria-label="Support message"
                />
              </div>

              <button type="button" className="cf-sp-cta">
                Support Maya
              </button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="cf-sp-success">
              <span className="cf-sp-success-icon">
                <Check size={28} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <h3 className="cf-sp-success-title">{supportPreview.success.title}</h3>
              <p className="cf-sp-success-body">{supportPreview.success.body}</p>

              <div style={{ marginTop: 28 }}>
                <CfButton href="#community" variant="outline-light">
                  See what happens next
                </CfButton>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}