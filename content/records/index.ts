import { validateRecord, type ProjectRecord } from "@/lib/records";
import { projects } from "./projects";

// Validation runs at module load, so a malformed record fails `next build`
// rather than shipping. (BUILD-PLAN 2.1)
projects.forEach(validateRecord);

export const projectRecords: ProjectRecord[] = projects;

export function recordBySlug(slug: string): ProjectRecord | undefined {
  return projectRecords.find((r) => r.slug === slug);
}

export function recordById(id: string): ProjectRecord | undefined {
  return projectRecords.find((r) => r.id === id);
}
