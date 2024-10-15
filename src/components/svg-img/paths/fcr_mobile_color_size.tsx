import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16.0005" r="9" transform="rotate(90 16 16.0005)" stroke={iconPrimary} stroke-width="2" />
    <circle cx="16" cy="16.0005" r="6" transform="rotate(90 16 16.0005)" fill={iconPrimary} />
  </svg>
);

export const viewBox = '0 0 32 32';
