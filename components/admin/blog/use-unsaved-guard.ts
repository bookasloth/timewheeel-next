"use client";

import { useCallback, useEffect, useRef, type RefObject } from "react";

const MESSAGE = "You have unsaved changes. Leave this page anyway?";
const snapshotOf = (form: HTMLFormElement | null) => (form ? JSON.stringify([...new FormData(form)].map(([k, v]) => [k, String(v)])) : "");

// Warns before leaving a form with unsaved edits: tab close or reload
// (beforeunload) and in-app link clicks (captured before next/link handles
// them). "Dirty" means the form's values differ from the last saved snapshot,
// which covers the hidden inputs (editor HTML, SEO fields) too. Call the
// returned markSaved() after a successful save; isDirty() reports edits.
export function useUnsavedGuard(formRef: RefObject<HTMLFormElement | null>) {
  const saved = useRef<string | null>(null);
  const markSaved = useCallback(() => {
    saved.current = snapshotOf(formRef.current);
  }, [formRef]);
  const isDirty = useCallback(() => saved.current !== null && snapshotOf(formRef.current) !== saved.current, [formRef]);

  useEffect(() => {
    // Baseline once the editor has mounted and written its first HTML.
    const t = window.setTimeout(markSaved, 400);
    const dirty = () => saved.current !== null && snapshotOf(formRef.current) !== saved.current;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!dirty()) return;
      e.preventDefault();
      e.returnValue = "";
    };
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (dirty() && !window.confirm(MESSAGE)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("click", onClick, true);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onClick, true);
    };
  }, [formRef, markSaved]);

  return [markSaved, isDirty] as const;
}
