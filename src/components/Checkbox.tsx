import { CSSProperties } from "react";

export interface CheckboxProps {
  readonly checked?: boolean;
  readonly disabled?: boolean;
  readonly onChange?: () => void;
  readonly name?: string;
  readonly style?: CSSProperties;
};

export const Checkbox = (props: CheckboxProps) => {
  const {
    checked,
    disabled,
    onChange,
    name,
    style
  } = props;

  const defaultStyle: CSSProperties = {
    display: "inline-block",
    marginRight: "8px",
    width: "16px",
    height: "16px",
    cursor: disabled
      ? "not-allowed"
      : "pointer"
  };

  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={onChange}
      name={name}
      style={
        {
          ...defaultStyle,
          ...style
        }
      }
    />
  );
};