/// <reference types="vite/client" />

// CSS modules
declare module '*.css' {
  const css: { [key: string]: string };
  export default css;
}

// Image formats
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}
