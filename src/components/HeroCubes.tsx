import type { CSSProperties } from "react";

const cubes = [
  { size: 120, spin: "46s", float: "11s", className: "right-[6%] top-[12%] opacity-40" },
  { size: 64, spin: "32s", float: "8s", className: "left-[4%] bottom-[14%] opacity-50" },
  { size: 44, spin: "26s", float: "7s", className: "left-[46%] top-[8%] opacity-30 hidden md:block" },
  { size: 80, spin: "38s", float: "10s", className: "right-[38%] bottom-[6%] opacity-25 hidden lg:block" },
];

export default function HeroCubes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {cubes.map((cube) => (
        <div
          key={cube.className}
          className={`cube-float absolute ${cube.className}`}
          style={{ "--float": cube.float } as CSSProperties}
        >
          <div
            className="cube-3d relative"
            style={{ "--size": `${cube.size}px`, "--spin": cube.spin } as CSSProperties}
          >
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
