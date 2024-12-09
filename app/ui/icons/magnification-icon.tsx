import React from "react";
import type { SVGProps } from "react";

export function MagniferationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1rem"
      height="1rem"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx={11.5} cy={11.5} r={9.5}></circle>
        <path strokeLinecap="round" d="m20 20l2 2"></path>
      </g>
    </svg>
  );
}
