import type { ReactNode } from "react";

export const inputClass =
  "block w-full rounded-xl border border-line bg-white px-4 py-3 text-base text-ink shadow-sm placeholder:text-muted/60 focus:border-brand-500 aria-[invalid=true]:border-emergency aria-[invalid=true]:bg-red-50/40";

/** Common accessibility attributes for an input: id/name, invalid state, hint + error wiring. */
export function fieldProps(id: string, error?: string, hint?: string) {
  const describedBy =
    [error && `${id}-error`, hint && !error && `${id}-hint`]
      .filter(Boolean)
      .join(" ") || undefined;
  return {
    id,
    name: id,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": describedBy,
  };
}

export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
        {required ? (
          <span className="text-emergency" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal text-muted"> (optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-emergency">
          {error}
        </p>
      ) : (
        hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-sm text-muted">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
