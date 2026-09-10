"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import type { DeskObjectDef } from "./deskConfig";

export function DeskObject({
  def,
  offset,
  draggable = true,
  onPersist,
  onActivate,
  children,
}: {
  def: DeskObjectDef;
  offset: { dx: number; dy: number };
  draggable?: boolean;
  onPersist: (id: string, dx: number, dy: number) => void;
  onActivate: (def: DeskObjectDef) => void;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(offset.dx);
  const y = useMotionValue(offset.dy);
  const draggedRef = useRef(false);
  const canDrag = draggable && !reduce;

  return (
    <motion.div
      className="obj obj-enter"
      style={{
        left: `${def.x}%`,
        top: `${def.y}%`,
        width: def.w,
        zIndex: def.z,
        x,
        y,
        rotate: def.r,
        cursor: canDrag ? "grab" : "pointer",
        animationDelay: `${Math.min(def.mobileOrder, 9) * 0.05}s`,
      }}
      drag={canDrag}
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => {
        draggedRef.current = true;
      }}
      onDragEnd={() => {
        onPersist(def.id, x.get(), y.get());
        window.setTimeout(() => {
          draggedRef.current = false;
        }, 40);
      }}
      onTap={() => {
        if (draggedRef.current) return;
        onActivate(def);
      }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
    >
      <div className="pointer-events-none">{children}</div>
      {def.label && <p className="obj-label pointer-events-none mt-1.5">{def.label}</p>}
    </motion.div>
  );
}
