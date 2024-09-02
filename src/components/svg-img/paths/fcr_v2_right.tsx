import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.72725 13.5227C3.50758 13.3031 3.50758 12.9469 3.72725 12.7273L7.32192 9.13258C7.39515 9.05936 7.39515 8.94064 7.32192 8.86742L3.72725 5.27275C3.50758 5.05308 3.50758 4.69692 3.72725 4.47725C3.94692 4.25758 4.30308 4.25758 4.52275 4.47725L8.11742 8.07192C8.62998 8.58449 8.62998 9.41552 8.11742 9.92808L4.52275 13.5227C4.30308 13.7424 3.94692 13.7424 3.72725 13.5227Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 12 18';
