import {
  CSSProperties,
  ReactNode,
  useState
} from "react";

export interface ButtonProps {
  readonly children?: ReactNode;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly style?: CSSProperties;
};

export const Button = (props: ButtonProps) => {
  const {
    children,
    onClick,
    disabled,
    style
  } = props;

  const [isHover, setIsHover] = useState(false);

  const defaultStyle: CSSProperties = {
    border: "solid 1px black",
    borderRadius: "16px",
    padding: "8px",
    backgroundColor: !isHover
      ? "rgb(239, 239, 239)"
      : "rgb(192, 192, 192)",
    cursor: disabled
      ? "not-allowed"
      : "pointer"
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      disabled={disabled}
      style={
        {
          ...defaultStyle,
          ...style
        }
      }
    >
      {children}
    </button>
  );
};