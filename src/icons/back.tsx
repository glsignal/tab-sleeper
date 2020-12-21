import React from 'react';

export default function Back({ color, width, height }) {
  return <svg  className="icon icon--back" fill={color || '#000000'} width={width || "24px"} height={height || "24px"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
  </svg>;
}
