export type DeskAction =
  | { type: "route"; href: string }
  | { type: "link"; href: string }
  | { type: "widget"; widget: "radio" | "calendar" | "newspaper" | "mug" };

export type DeskObjectDef = {
  id: string;
  label: string;
  /** anchor position as % of the scene (top-left of the object box) */
  x: number;
  y: number;
  /** resting rotation in degrees */
  r: number;
  /** object width in px at desktop */
  w: number;
  z: number;
  action: DeskAction;
  /** order in the mobile stacked layout + entrance stagger */
  mobileOrder: number;
};

/* Center column (x 34-62, y 4-16 headline · y 34-76 mini-me) is kept clear. */
export const deskObjects: DeskObjectDef[] = [
  {
    id: "crt",
    label: "Decisions",
    x: 62, y: 13, r: -2, w: 330, z: 6,
    action: { type: "route", href: "/decisions" },
    mobileOrder: 1,
  },
  {
    id: "arcade",
    label: "Arcade",
    x: 83, y: 44, r: 3, w: 148, z: 5,
    action: { type: "route", href: "/arcade" },
    mobileOrder: 2,
  },
  {
    id: "notebook",
    label: "Work",
    x: 19, y: 64, r: 4, w: 196, z: 6,
    action: { type: "route", href: "/work" },
    mobileOrder: 3,
  },
  {
    id: "polaroid",
    label: "That's me",
    x: 5, y: 12, r: -6, w: 176, z: 7,
    action: { type: "route", href: "/about" },
    mobileOrder: 0,
  },
  {
    id: "stickies",
    label: "Playbook",
    x: 79, y: 68, r: -8, w: 150, z: 7,
    action: { type: "route", href: "/about#playbook" },
    mobileOrder: 6,
  },
  {
    id: "resume",
    label: "Résumé",
    x: 6, y: 42, r: 5, w: 152, z: 5,
    action: { type: "link", href: "/kaustubh-jain-resume.pdf" },
    mobileOrder: 7,
  },
  {
    id: "radio",
    label: "Now",
    x: 80, y: 13, r: 1, w: 176, z: 5,
    action: { type: "widget", widget: "radio" },
    mobileOrder: 5,
  },
  {
    id: "calendar",
    label: "Fun fact",
    x: 66, y: 58, r: -4, w: 190, z: 6,
    action: { type: "widget", widget: "calendar" },
    mobileOrder: 4,
  },
  {
    id: "newspaper",
    label: "Tech pulse",
    x: 4, y: 66, r: 3, w: 222, z: 5,
    action: { type: "widget", widget: "newspaper" },
    mobileOrder: 8,
  },
  {
    id: "mug",
    label: "",
    x: 45, y: 76, r: 0, w: 66, z: 9,
    action: { type: "widget", widget: "mug" },
    mobileOrder: 9,
  },
];

export const DESK_STORE = "kj-desk-positions-v1";
