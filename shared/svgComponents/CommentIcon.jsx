import Svg, { Path } from "react-native-svg";

const CommentIcon = ({ style, fill }) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" style={style} fill="none">
      <Path
        clip-rule="evenodd"
        d="M3 11.5C2.99656 12.8199 3.30493 14.1219 3.9 15.3C5.33904 18.1793 8.28109 19.9988 11.5 20C12.8199 20.0034 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0034 12.8199 20 11.5C19.9988 8.28109 18.1793 5.33904 15.3 3.9C14.1219 3.30493 12.8199 2.99656 11.5 3H11C6.68419 3.2381 3.2381 6.68419 3 11V11.5V11.5Z"
        stroke={fill || "#FF6C00"}
        fill={fill}
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CommentIcon;
