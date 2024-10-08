import React from 'react';
import { Svg, Path, Mask, Rect, G } from 'react-native-svg';

const BackIcon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Mask id="mask0_233_59" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
      <Rect width="24" height="24" fill="#D9D9D9"/>
    </Mask>
    <G mask="url(#mask0_233_59)">
      <Path d="M3.54995 12L10.9 19.35C11.15 19.6 11.2708 19.8917 11.2625 20.225C11.2541 20.5583 11.125 20.85 10.875 21.1C10.625 21.35 10.3333 21.475 9.99995 21.475C9.66662 21.475 9.37495 21.35 9.12495 21.1L1.42495 13.425C1.22495 13.225 1.07495 13 0.974951 12.75C0.874951 12.5 0.824951 12.25 0.824951 12C0.824951 11.75 0.874951 11.5 0.974951 11.25C1.07495 11 1.22495 10.775 1.42495 10.575L9.12495 2.87499C9.37495 2.62499 9.67078 2.50415 10.0125 2.51249C10.3541 2.52082 10.65 2.64999 10.9 2.89999C11.15 3.14999 11.275 3.44165 11.275 3.77499C11.275 4.10832 11.15 4.39999 10.9 4.64999L3.54995 12Z" fill="#FCFCFC"/>
    </G>
  </Svg>
);

export default BackIcon;
