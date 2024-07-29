import React from 'react';
import Svg, { Path, Mask, G, Rect } from 'react-native-svg';

const AddIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <Mask id="mask0" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
      <Rect width="48" height="48" fill="#CCCCCC" />
    </Mask>
    <G mask="url(#mask0)">
      <Path d="M22 26H12C11.4333 26 10.9583 25.8083 10.575 25.425C10.1917 25.0417 10 24.5667 10 24C10 23.4333 10.1917 22.9583 10.575 22.575C10.9583 22.1917 11.4333 22 12 22H22V12C22 11.4333 22.1917 10.9583 22.575 10.575C22.9583 10.1917 23.4333 10 24 10C24.5667 10 25.0417 10.1917 25.425 10.575C25.8083 10.9583 26 11.4333 26 12V22H36C36.5667 22 37.0417 22.1917 37.425 22.575C37.8083 22.9583 38 23.4333 38 24C38 24.5667 37.8083 25.0417 37.425 25.425C37.0417 25.8083 36.5667 26 36 26H26V36C26 36.5667 25.8083 37.0417 25.425 37.425C25.0417 37.8083 24.5667 38 24 38C23.4333 38 22.9583 37.8083 22.575 37.425C22.1917 37.0417 22 36.5667 22 36V26Z" fill="#666666" />
    </G>
  </Svg>
);

export default AddIcon;
