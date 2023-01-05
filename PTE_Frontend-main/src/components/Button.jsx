import { useDispatch } from "react-redux";
import { resetIsClicked } from "../features/global";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnClick = () => {
    dispatch(resetIsClicked());
    if (text === "Logout") {
      dispatch(logout());
      navigate("/login");
    }
  };
  return (
    <button
      type="button"
      onClick={handleOnClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={` text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
