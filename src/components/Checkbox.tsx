import clsx from "clsx";
import "./Checkbox.scss";
import { CheckboxChecked } from "./Icons/CheckboxChecked";
import { CheckboxUnchecked } from "./Icons/CheckboxUnchecked";

export interface Props {
  label: string;
  name: string;
  isChecked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ label, name, isChecked, onChange }: Props) => {
  return (
    <div
      className={clsx(
        "checkbox",
        isChecked ? "checkbox--checked" : "checkbox--unchecked"
      )}
      onClick={() => onChange()}
    >
      <input
        type="checkbox"
        className="checkbox__toggle"
        checked={isChecked}
        onChange={() => onChange()}
      />

      {isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}

      <label htmlFor={name} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};
