import Svg, { ClipPath, Path, G, Defs } from "react-native-svg";

const CameraIcon = ({ fill }) => {
  return (
    <Svg width="24" height="24" fill="none" viewBox="0 0 24 24">
      <G fill={fill || "#BDBDBD"} clip-path="url(#a)">
        <Path d="M11.9998 15.2c1.7673 0 3.2-1.4327 3.2-3.2s-1.4327-3.20001-3.2-3.20001-3.2 1.43271-3.2 3.20001c0 1.7673 1.4327 3.2 3.2 3.2Z" />
        <Path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9Zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5Z" />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default CameraIcon;
