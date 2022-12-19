import Svg, { Path } from "react-native-svg";

const GoBackIcon = () => {
  return (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
      <Path
        d="M20 12H4M10 18l-6-6 6-6"
        stroke="#212121"
        stroke-opacity=".8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default GoBackIcon;
