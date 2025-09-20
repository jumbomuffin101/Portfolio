import React from "react";
export default function Logo({
  size = 96,
  bg = "#0f172a",
  fg = "#ffffff",
  title = "Logo",
  className = "",
  ...rest
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      className={className}
      {...rest}
    >
      <title>{title}</title>
      <rect width="96" height="96" rx="16" fill={bg} />
      <path d="M24 64h8V32h-8v32zm16 0h8V40h-8v24zm16 0h8V24h-8v40z" fill={fg} />
    </svg>
  );
}