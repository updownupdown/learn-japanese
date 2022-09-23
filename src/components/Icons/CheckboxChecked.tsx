import * as React from "react";

export function CheckboxChecked(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="#000000"
      xmlns="https://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3ZM9.3 16.29C9.69 16.68 10.32 16.68 10.71 16.29L18.29 8.7C18.68 8.31 18.68 7.68 18.29 7.29C17.9 6.9 17.27 6.9 16.88 7.29L10 14.17L7.12 11.29C6.73 10.9 6.1 10.9 5.71 11.29C5.52275 11.4768 5.41751 11.7305 5.41751 11.995C5.41751 12.2595 5.52275 12.5132 5.71 12.7L9.3 16.29Z"
        fill="black"
      />
    </svg>
  );
}
