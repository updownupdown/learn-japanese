import React from "react";
import { Settings, Modes, Fonts, instructions } from "../App";
import { AlphabetTypes } from "../library/alphabet";
import { Checkbox } from "./Checkbox";
import { Toggle, ToggleGroup } from "./Toggle";
import { Menu } from "./Icons/Menu";
import { Close } from "./Icons/Close";
import clsx from "clsx";
import "./Nav.scss";

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
  settings: Settings;
  setSettings: (settings: Settings) => void;
  showMenu: boolean;
  setShowMenu: (show: boolean) => void;
}

export const Nav = ({
  settings,
  setSettings,
  showMenu,
  setShowMenu,
}: Props) => {
  return (
    <>
      <div className="menu-icon" onClick={() => setShowMenu(true)}>
        <Menu />
      </div>

      {showMenu && (
        <div className="nav-mask" onClick={() => setShowMenu(false)} />
      )}

      <div className={clsx("nav", showMenu ? "nav--show" : "nav--hide")}>
        <div className="nav__close" onClick={() => setShowMenu(false)}>
          <Close />
        </div>
        <div className="nav__menu">
          <MenuSection title="Mode">
            <ToggleGroup label="Alphabet" hideLabel>
              <>
                {Object.entries(Modes).map(([key, value]) => {
                  return (
                    <Toggle
                      key={value}
                      name={value}
                      label={value}
                      isCurrent={settings.mode === value}
                      onClick={() => setSettings({ ...settings, mode: value })}
                    />
                  );
                })}
              </>
            </ToggleGroup>

            <p className="nav__instructions">{instructions[settings.mode]}</p>
          </MenuSection>

          <MenuSection title="Options">
            <ToggleGroup label="Alphabet" hideLabel>
              {Object.entries(AlphabetTypes).map(([key, value]) => {
                return (
                  <Toggle
                    key={key}
                    name={value}
                    label={value}
                    isCurrent={settings.alphabet === value}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        alphabet: value,
                      })
                    }
                  />
                );
              })}
            </ToggleGroup>

            <Checkbox
              label="Dakuten"
              name="dakuten"
              isChecked={settings.includeDakuten}
              onChange={() =>
                setSettings({
                  ...settings,
                  includeDakuten: !settings.includeDakuten,
                })
              }
            />
            <Checkbox
              label="Yōon"
              name="yoon"
              isChecked={settings.includeYoon}
              onChange={() =>
                setSettings({ ...settings, includeYoon: !settings.includeYoon })
              }
            />

            {settings.mode === Modes.tableReview && (
              <Checkbox
                name="english-on-hover"
                label="English on hover only"
                isChecked={settings.englishOnHover}
                onChange={() => {
                  setSettings({
                    ...settings,
                    englishOnHover: !settings.englishOnHover,
                  });
                }}
              />
            )}
          </MenuSection>

          <MenuSection title="Font">
            <ToggleGroup label="Font" hideLabel>
              {Object.entries(Fonts).map(([key, value]) => {
                return (
                  <Toggle
                    key={key}
                    name={value}
                    label={value}
                    isCurrent={settings.font === value}
                    onClick={() =>
                      setSettings({
                        ...settings,
                        font: value,
                      })
                    }
                  />
                );
              })}
            </ToggleGroup>
          </MenuSection>

          <a
            className="nav__link"
            href="https://github.com/updownupdown/learn-japanese"
            target="_blank"
            rel="noreferrer"
          >
            About
          </a>
        </div>
      </div>
    </>
  );
};
