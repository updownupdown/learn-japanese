import clsx from "clsx";
import "./Toggle.scss";

export interface ToggleGroupProps {
  label: string;
  hideLabel?: boolean;
  children: React.ReactNode;
  isVertical?: boolean;
}

export const ToggleGroup = ({
  label,
  hideLabel,
  children,
  isVertical,
}: ToggleGroupProps) => {
  return (
    <div
      className={clsx(
        "toggle-group",
        isVertical ? "toggle-group--vertical" : "toggle-group--horizontal"
      )}
    >
      {hideLabel !== true && <label>{label}</label>}
      <div className="toggle-buttons">{children}</div>
    </div>
  );
};

export interface ToggleProps {
  label: string;
  name: string;
  isCurrent: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const Toggle = ({
  label,
  name,
  isCurrent,
  onClick,
  disabled,
}: ToggleProps) => {
  return (
    <button
      name={name}
      disabled={disabled}
      className={clsx("toggle", isCurrent && "toggle--current")}
      onClick={() => {
        !isCurrent && onClick();
      }}
    >
      <label htmlFor={label}>{label}</label>
    </button>
  );
};
