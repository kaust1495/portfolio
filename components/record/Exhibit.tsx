import type { Exhibit as ExhibitType } from "@/lib/records";

/**
 * A drawn exhibit frame with a number and a caption stating what it PROVES,
 * not what it is.
 *
 * Where the artefact itself is still outstanding, the frame says so plainly
 * and states what it will prove. An empty frame that names its own gap is
 * on-message for a register; a case study with no evidence and no
 * acknowledgement is not.
 */
export function Exhibit({ exhibit, children }: { exhibit: ExhibitType; children?: React.ReactNode }) {
  return (
    <figure className="exhibit">
      <div className="exhibit__frame">
        {children ?? (
          <div className="exhibit__pending">
            <span className="exhibit__pendingLabel">Exhibit outstanding</span>
            <span className="exhibit__pendingNote">
              {exhibit.kind === "screenshot"
                ? "A redacted screenshot goes here."
                : "A drawn diagram goes here."}
            </span>
          </div>
        )}
      </div>
      <figcaption className="exhibit__caption">
        <span className="exhibit__id">{exhibit.id}</span>
        <span className="exhibit__proves">{exhibit.proves}</span>
        {exhibit.redaction && <span className="exhibit__redaction">Redaction: {exhibit.redaction}</span>}
      </figcaption>
    </figure>
  );
}

/**
 * A real black bar. Hover or focus lifts it to the generalised version, which
 * turns the biggest content constraint into a signature device.
 */
export function Redacted({ children, generalised }: { children?: React.ReactNode; generalised: string }) {
  return (
    <span className="redacted" tabIndex={0} role="button" aria-label={`Redacted: ${generalised}`}>
      <span className="redacted__bar" aria-hidden="true">
        {children ?? "████████"}
      </span>
      <span className="redacted__general">{generalised}</span>
    </span>
  );
}
