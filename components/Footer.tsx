import { person } from "@/content/profile";

export function Footer() {
  return (
    <footer className="section" style={{ paddingBlock: "3.5rem" }}>
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-serif text-xl">{person.name}</p>
          <p className="label mt-2">
            {person.role} · {person.location}
          </p>
        </div>
        <div className="text-xs sm:text-right" style={{ color: "var(--faint)" }}>
          <p>
            Built with Next.js, deployed on Vercel. Set in Instrument Serif &amp; Geist.
          </p>
          <p className="mt-1">© {new Date().getFullYear()} {person.fullName}</p>
        </div>
      </div>
    </footer>
  );
}
