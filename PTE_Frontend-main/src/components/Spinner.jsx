import authStyle from "../authentication.module.css";
import cx from "classnames";
function Spinner() {
  const size = {
    width: "6rem",
    height: "6rem",
  };
  return (
    <div className={cx(authStyle["loadingSpinnerContainer"])}>
      <div
        className={cx(authStyle["spinner-grow"], authStyle["text-primary"])}
        role="status"
        style={size}
      ></div>
    </div>
  );
}

export default Spinner;
