import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => (
  <g>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.0398 25.642H31.7102C35.1841 25.642 38.0021 28.4059 38 31.822C38 35.2341 35.1841 38 31.7081 38C28.2322 38 25.4162 35.2341 25.4162 31.822C25.4162 30.6637 25.7431 29.5825 26.3039 28.6579C24.9486 28.2677 23.221 28.0726 21.8368 28.8997C22.3106 29.7695 22.5817 30.7632 22.5817 31.822C22.5817 35.2341 19.7678 38 16.2898 38C12.8159 38 10 35.2341 10 31.822C10 28.4059 12.8159 25.642 16.2898 25.642H19.2175L22.11 22.925C21.8099 23.3151 21.6279 23.8008 21.6279 24.3313C21.6279 25.6156 22.6893 26.6602 24.001 26.6602C25.3107 26.6602 26.3721 25.6156 26.3721 24.3292C26.3721 23.0408 25.3107 21.9983 24.001 21.9983C23.5045 21.9983 23.0431 22.1486 22.6645 22.4027L35.8648 10C35.8648 10 36.1462 15.3387 34.3896 17.7895C32.6309 20.2384 27.7584 23.9878 27.7584 23.9878C27.7584 23.9878 27.2453 25.3067 28.0398 25.642ZM12.3794 31.822C12.3794 33.9437 14.1318 35.6609 16.2898 35.6609C18.4519 35.6609 20.2023 33.9437 20.2023 31.822C20.2023 29.6984 18.4519 27.9771 16.2898 27.9771C14.1318 27.9771 12.3794 29.6984 12.3794 31.822ZM27.7997 31.822C27.7997 33.9437 29.5481 35.6609 31.7102 35.6609C33.8702 35.6609 35.6206 33.9437 35.6227 31.8241C35.6227 29.7004 33.8702 27.9791 31.7102 27.9791C30.5164 27.9791 29.4508 28.5075 28.7308 29.3346L28.6087 29.487C28.1018 30.1353 27.7997 30.9421 27.7997 31.822ZM23.5173 20.3005L19.4396 24C19.4396 24 8.71615 17.5899 11.3953 10L23.5173 20.3005Z"
      fill={iconPrimary}></path>
  </g>
);
export const viewBox = '0 0 48 48';