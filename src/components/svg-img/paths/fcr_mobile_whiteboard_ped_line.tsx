import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary,iconSecondary }: PathOptions) => (
  <g>
  <path
    fill={iconPrimary}
    d="M27.3364 15.0785L25.9963 17.0161C25.9206 17.1257 25.8212 17.2168 25.7055 17.2827L19.4047 20.8749M17.1014 7.99974L15.7538 9.94825C15.6829 10.0508 15.6343 10.1671 15.6113 10.2897L14.2872 17.3356M19.4047 20.8749L14.5968 23.6161C13.9387 23.9912 13.143 23.4241 13.2829 22.6797L14.2872 17.3356M19.4047 20.8749L14.2872 17.3356"
      stroke={iconSecondary?iconSecondary:'white'}
      stroke-width="1.77778"
      stroke-linecap="round"
  />
  <path d="M8 24L12.4444 24" stroke={iconSecondary?iconSecondary:'white'} stroke-width="1.77778" stroke-linecap="round" />
</g>
);
export const viewBox = '0 0 32 32';

