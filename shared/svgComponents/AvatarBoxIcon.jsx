import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const AvatarBoxIcon = ({ fill, style }) => {
  return (
    <Svg
      style={style}
      width="25px"
      height="25px"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx="12.5"
        cy="12.5"
        r="12"
        fill="white"
        stroke={fill || "#FF6C00"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13 6h-1v6H6v1h6v6h1v-6h6v-1h-6V6Z"
        fill={fill || "#FF6C00"}
      />
    </Svg>
  );
};

export default AvatarBoxIcon;
