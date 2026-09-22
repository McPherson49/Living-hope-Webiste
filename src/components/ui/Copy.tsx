import { Fragment } from "react";

const SPLIT = /(\[[^\]]+\])/g;
const IS_PLACEHOLDER = /^\[[^\]]+\]$/;

/**
 * Renders text, highlighting any [bracketed placeholder] so unconfirmed
 * hospital details are impossible to miss. Once a value is replaced with real
 * content there are no brackets left and this renders plain text.
 */
export function Copy({ children }: { children: string }) {
  return (
    <>
      {children.split(SPLIT).map((part, i) =>
        IS_PLACEHOLDER.test(part) ? (
          <span
            key={i}
            className="ph"
            title="Placeholder — confirm this detail with the hospital before launch"
          >
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
