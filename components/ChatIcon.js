import React from 'react';
import Svg, { Mask, Rect, G, Path } from 'react-native-svg';

const ChatIcon = ({ fill, focused }) => {
  if (focused) {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
        <Mask id="mask0_233_373" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="28">
          <Rect x="0.5" width="28" height="28" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_233_373)">
          <Path d="M7.50004 21L4.81671 23.6834C4.44726 24.0528 4.02435 24.1355 3.54796 23.9313C3.07157 23.7271 2.83337 23.3625 2.83337 22.8375V4.66671C2.83337 4.02504 3.06185 3.47574 3.51879 3.01879C3.97574 2.56185 4.52504 2.33337 5.16671 2.33337H23.8334C24.475 2.33337 25.0243 2.56185 25.4813 3.01879C25.9382 3.47574 26.1667 4.02504 26.1667 4.66671V18.6667C26.1667 19.3084 25.9382 19.8577 25.4813 20.3146C25.0243 20.7716 24.475 21 23.8334 21H7.50004Z" fill="#FCFCFC" />
        </G>
      </Svg>
    );
  } else {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
        <Mask id="mask0_185_107" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="29" height="28">
          <Rect x="0.5" width="28" height="28" fill="#D9D9D9" />
        </Mask>
        <G mask="url(#mask0_185_107)">
          <Path d="M7.50004 21L4.81671 23.6833C4.44726 24.0528 4.02435 24.1354 3.54796 23.9312C3.07157 23.7271 2.83337 23.3625 2.83337 22.8375V4.66665C2.83337 4.02498 3.06185 3.47567 3.51879 3.01873C3.97574 2.56179 4.52504 2.33331 5.16671 2.33331H23.8334C24.475 2.33331 25.0243 2.56179 25.4813 3.01873C25.9382 3.47567 26.1667 4.02498 26.1667 4.66665V18.6666C26.1667 19.3083 25.9382 19.8576 25.4813 20.3146C25.0243 20.7715 24.475 21 23.8334 21H7.50004ZM6.50837 18.6666H23.8334V4.66665H5.16671V19.9791L6.50837 18.6666Z" fill={fill} />
        </G>
      </Svg>
    );
  }
};

export default ChatIcon;
