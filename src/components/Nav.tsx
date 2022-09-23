import React, { useState } from "react";
import { Mode, Modes } from "../App";
import { AlphabetType, AlphabetTypes } from "../library/alphabet";
import { Checkbox } from "./Checkbox";
import { Menu } from "./Icons/Menu";
import "./Nav.scss";
import { Toggle, ToggleGroup } from "./Toggle";

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
}

const MenuSection = ({ title, children }: MenuSectionProps) => {
  return (
    <div className="menu-section">
      <h3>{title}</h3>
      {children}
    </div>
  );
};

interface Props {
  mode: Mode;
  setMode: (mode: Mode) => void;
  alphabet: AlphabetType;
  setAlphabet: (alphabet: AlphabetType) => void;
  includeDakuten: boolean;
  setIncludeDakuten: (include: boolean) => void;
  includeYoon: boolean;
  setIncludeYoon: (include: boolean) => void;
}

export const Nav = ({
  mode,
  setMode,
  alphabet,
  setAlphabet,
  includeDakuten,
  setIncludeDakuten,
  includeYoon,
  setIncludeYoon,
}: Props) => {
  // const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="nav">
      <div className="nav__icon">
        <Menu />
      </div>
      <div className="nav__menu">
        <MenuSection title="Mode">
          <ToggleGroup label="Alphabet" hideLabel isVertical>
            <>
              {Object.entries(Modes).map(([key, value]) => {
                return (
                  <Toggle
                    key={value}
                    name={value}
                    label={value}
                    isCurrent={mode === value}
                    onClick={() => setMode(value as Mode)}
                  />
                );
              })}
            </>
          </ToggleGroup>
        </MenuSection>

        <MenuSection title="Alphabet Options">
          <ToggleGroup label="Alphabet" hideLabel>
            <Toggle
              name={AlphabetTypes.hiragana}
              label={AlphabetTypes.hiragana}
              isCurrent={alphabet === AlphabetTypes.hiragana}
              onClick={() => setAlphabet(AlphabetTypes.hiragana)}
            />
            <Toggle
              name={AlphabetTypes.katakana}
              label={AlphabetTypes.katakana}
              isCurrent={alphabet === AlphabetTypes.katakana}
              onClick={() => setAlphabet(AlphabetTypes.katakana)}
            />
          </ToggleGroup>

          <Checkbox
            label="Dakuten"
            name="dakuten"
            isChecked={includeDakuten}
            onChange={() => setIncludeDakuten(!includeDakuten)}
          />

          <Checkbox
            label="Yōon"
            name="yoon"
            isChecked={includeYoon}
            onChange={() => setIncludeYoon(!includeYoon)}
          />
        </MenuSection>
      </div>
    </div>
  );
};
