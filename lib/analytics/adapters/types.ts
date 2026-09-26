// Shape every analytics adapter implements. The bus (index.ts) calls these;
// components never touch gtag/fbq/clarity/posthog directly. Add or drop a tool
// next year by editing one adapter file, with zero call-site churn.
export type Props = Record<string, unknown>;

export interface Adapter {
  name: string;
  // true → loads only after marketing consent; false → first-party, always-on.
  needsConsent: boolean;
  init(): void;
  identify?(id: string, props?: Props): void;
  reset?(): void;
  track?(event: string, props?: Props): void;
  page?(props?: Props): void;
}
