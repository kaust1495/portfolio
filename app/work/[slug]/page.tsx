import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectRecords, recordBySlug } from "@/content/records";
import { routeMetadata } from "@/lib/seo";
import { RecordTemplate } from "@/components/record/RecordTemplate";
import { ApprovalGate, RoutingWipe, ToilSlider } from "@/components/record/instruments";

export function generateStaticParams() {
  return projectRecords.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = recordBySlug(slug);
  if (!r) return {};
  // image: false — opengraph-image.tsx in this segment supplies the card
  return routeMetadata({
    path: `/work/${r.slug}`,
    title: `${r.id} ${r.title}`,
    description: `${r.problem.slice(0, 150)}…`,
    image: false,
  });
}

export default async function RecordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = projectRecords.findIndex((r) => r.slug === slug);
  if (idx === -1) notFound();
  const record = projectRecords[idx];
  const next = projectRecords[(idx + 1) % projectRecords.length];

  // Rendered, not called: instruments live in a client module.
  const instrument =
    record.slug === "helix" ? <ApprovalGate /> :
    record.slug === "subpoena-migration" ? <RoutingWipe /> :
    record.slug === "platform-automation" ? <ToilSlider /> :
    null;

  return (
    <>
      <RecordTemplate record={record} instrument={instrument} />

      <nav className="record-nav" aria-label="Record navigation">
        <Link className="xref" href="/work">
          ← All records
        </Link>
        <Link className="xref" href={`/work/${next.slug}`}>
          {next.id} {next.title} →
        </Link>
      </nav>
    </>
  );
}
