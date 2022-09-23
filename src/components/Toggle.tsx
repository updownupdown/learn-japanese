import clsx from "clsx";
import { RadioChecked } from "./Icons/RadioChecked";
import { RadioUnchecked } from "./Icons/RadioUnchecked";
import "./Toggle.scss";

export interface ToggleGroupProps {
  label: string;
  hideLabel?: boolean;
  children: React.ReactNode;
}

export const ToggleGroup = ({
  label,
  hideLabel,
  children,
}: ToggleGroupProps) => {
  return (
    <div className="toggle-group">
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
    <div
      className={clsx(
        "toggle",
        isCurrent ? "toggle--checked" : "toggle--unchecked"
      )}
      onClick={() => {
        !isCurrent && onClick();
      }}
    >
      {isCurrent ? <RadioChecked /> : <RadioUnchecked />}
      <input type="radio" name={name} disabled={disabled} />
      <label htmlFor={name} className="toggle__label">
        {label}
      </label>
    </div>
  );
};
