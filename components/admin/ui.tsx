import type { ReactNode } from "react";

// Console primitives, after The Parliament's admin-ui.tsx: gray-50 page,
// white panels with hairline borders, 3 to 5px radii, 11px uppercase micro
// labels, compact tables. Primary actions use Timewheel orange.

export const btn = {
  primary: "inline-flex h-9 items-center gap-1.5 rounded-[3px] bg-[#F45B0A] px-4 text-sm font-medium text-white transition-colors hover:bg-[#D94E06] disabled:opacity-60",
  ghost: "inline-flex h-9 items-center gap-1.5 rounded-[3px] border border-gray-300 px-4 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 disabled:opacity-60",
  danger: "inline-flex h-9 items-center gap-1.5 rounded-[3px] bg-rose-600 px-4 text-sm font-medium text-white transition-colors hover:bg-rose-500 disabled:opacity-60",
  smGhost: "inline-flex h-7 items-center gap-1 rounded-[3px] border border-gray-300 px-2.5 text-xs font-medium text-gray-800 transition-colors hover:bg-gray-100 disabled:opacity-60",
  smDanger: "inline-flex h-7 items-center gap-1 rounded-[3px] px-2.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50 disabled:opacity-60",
};

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-0.5 text-sm text-gray-600">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}

export function StatCard({ label, value, hint, icon }: { label: string; value: string; hint?: string; icon: ReactNode }) {
  return (
    <div className="rounded-[5px] border border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-gray-500">{label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{value}</p>
        </div>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-[4px] bg-gray-100 text-gray-600">{icon}</div>
      </div>
      {hint && <p className="mt-2 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export function Panel({ title, action, children, flush }: { title?: string; action?: ReactNode; children: ReactNode; flush?: boolean }) {
  return (
    <section className="rounded-[5px] border border-gray-200 bg-white">
      {title && (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-2.5">
          <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          {action}
        </div>
      )}
      <div className={flush ? "" : "p-4"}>{children}</div>
    </section>
  );
}

export function Table({ children, minWidth = 640 }: { children: ReactNode; minWidth?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm" style={{ minWidth }}>
        {children}
      </table>
    </div>
  );
}

export function Th({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return <th className={`px-3 py-2 text-left text-[11px] font-medium uppercase tracking-wider text-gray-500 ${className}`}>{children}</th>;
}

export function Td({ children, className = "", colSpan }: { children?: ReactNode; className?: string; colSpan?: number }) {
  return (
    <td colSpan={colSpan} className={`border-t border-gray-200 px-3 py-2.5 text-gray-700 ${className}`}>
      {children}
    </td>
  );
}

const STATUS: Record<string, string> = {
  premium: "border-orange-200 bg-orange-50 text-[#C2410C]",
  lifetime: "border-orange-200 bg-orange-50 text-[#C2410C]",
  admin: "border-sky-200 bg-sky-50 text-sky-700",
  free: "border-gray-200 bg-gray-50 text-gray-600",
  paid: "border-emerald-200 bg-emerald-50 text-emerald-700",
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  published: "border-emerald-200 bg-emerald-50 text-emerald-700",
  hidden: "border-gray-200 bg-gray-100 text-gray-600",
  unconfirmed: "border-amber-200 bg-amber-50 text-amber-700",
};

export function StatusBadge({ status, children }: { status: string; children?: ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-[3px] border px-1.5 py-0.5 text-[11px] font-semibold capitalize ${STATUS[status] ?? STATUS.free}`}>
      {children ?? status}
    </span>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-[5px] border border-dashed border-gray-300 bg-white px-6 py-12 text-center">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      {description && <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
