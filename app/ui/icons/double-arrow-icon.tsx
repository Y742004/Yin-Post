import React from "react";
import type { SVGProps } from "react";

export function DoubleArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="m11 19l6-7l-6-7"></path>
        <path d="m7 19l6-7l-6-7"></path>
      </g>
    </svg>
  );
}
