import React from 'react';
import { Svg, Path, G, Rect, Mask } from 'react-native-svg';

const ProfileIcon = ({ fill }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
    <Mask id="mask0_185_378" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="28">
      <Rect width="28" height="28" fill="#D9D9D9" />
    </Mask>
    <G mask="url(#mask0_185_378)">
      <Path d="M14 14C12.7166 14 11.618 13.543 10.7041 12.6291C9.79024 11.7152 9.33329 10.6166 9.33329 9.33329C9.33329 8.04996 9.79024 6.95135 10.7041 6.03746C11.618 5.12357 12.7166 4.66663 14 4.66663C15.2833 4.66663 16.3819 5.12357 17.2958 6.03746C18.2097 6.95135 18.6666 8.04996 18.6666 9.33329C18.6666 10.6166 18.2097 11.7152 17.2958 12.6291C16.3819 13.543 15.2833 14 14 14ZM4.66663 21V20.0666C4.66663 19.4055 4.83676 18.7979 5.17704 18.2437C5.51732 17.6895 5.9694 17.2666 6.53329 16.975C7.73885 16.3722 8.96385 15.9201 10.2083 15.6187C11.4527 15.3173 12.7166 15.1666 14 15.1666C15.2833 15.1666 16.5472 15.3173 17.7916 15.6187C19.0361 15.9201 20.2611 16.3722 21.4666 16.975C22.0305 17.2666 22.4826 17.6895 22.8229 18.2437C23.1632 18.7979 23.3333 19.4055 23.3333 20.0666V21C23.3333 21.6416 23.1048 22.1909 22.6479 22.6479C22.1909 23.1048 21.6416 23.3333 21 23.3333H6.99996C6.35829 23.3333 5.80899 23.1048 5.35204 22.6479C4.8951 22.1909 4.66663 21.6416 4.66663 21ZM6.99996 21H21V20.0666C21 19.8527 20.9465 19.6583 20.8395 19.4833C20.7326 19.3083 20.5916 19.1722 20.4166 19.075C19.3666 18.55 18.3069 18.1562 17.2375 17.8937C16.168 17.6312 15.0888 17.5 14 17.5C12.9111 17.5 11.8319 17.6312 10.7625 17.8937C9.69302 18.1562 8.63329 18.55 7.58329 19.075C7.40829 19.1722 7.26732 19.3083 7.16038 19.4833C7.05343 19.6583 6.99996 19.8527 6.99996 20.0666V21ZM14 11.6666C14.6416 11.6666 15.1909 11.4382 15.6479 10.9812C16.1048 10.5243 16.3333 9.97496 16.3333 9.33329C16.3333 8.69163 16.1048 8.14232 15.6479 7.68538C15.1909 7.22843 14.6416 6.99996 14 6.99996C13.3583 6.99996 12.809 7.22843 12.352 7.68538C11.8951 8.14232 11.6666 8.69163 11.6666 9.33329C11.6666 9.97496 11.8951 10.5243 12.352 10.9812C12.809 11.4382 13.3583 11.6666 14 11.6666Z" fill={fill} />
    </G>
  </Svg>
);

export default ProfileIcon;
