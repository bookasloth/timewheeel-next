import { az } from "@/lib/alluminaty";

function TickerRun({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item) => (
        <span className="az-ticker-item" key={`a-${item}`}>
          {item}
        </span>
      ))}
    </>
  );
}

export function AzMarquee() {
  const items = az.ticker;
  return (
    <div className="az-ticker">
      <div className="az-ticker-track" aria-hidden="true">
        <TickerRun items={items} />
        <TickerRun items={items} />
      </div>
    </div>
  );
}