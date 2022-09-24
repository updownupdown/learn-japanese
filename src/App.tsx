import React, { useState } from "react";
import { AlphabetTable } from "./components/AlphabetTable";
import { TypeChars } from "./components/TypeChars";
import { Nav } from "./components/Nav";
import { PlaceInTable } from "./components/PlaceInTable";
import { WordBuilder } from "./components/TypeWords";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";
import { ValueOf } from "./utils/utils";
import clsx from "clsx";

export const Modes = {
  tableReview: "Study",
  placeInTable: "Find in table",
  typeChars: "Type characters",
  typeWords: "Type words",
} as const;
export type Mode = ValueOf<typeof Modes>;

export const instructions = {
  [Modes.tableReview]: "Review the hiragana and katakana characters.",
  [Modes.placeInTable]:
    "Find the correct location for the character in the table by clicking the appropriate cell.",
  [Modes.typeChars]:
    "Type the corresponding romaji (English characters) for each character shown. Press spacebar for a hint!",

  [Modes.typeWords]:
    "Type the corresponding romaji (English characters) for each word shown.",
};

export const Fonts = {
  notoSansJp: "Noto Sans",
  redHat: "Red Hat",
  hinaMincho: "Hina Mincho",
} as const;
export type Font = ValueOf<typeof Fonts>;

export interface Settings {
  mode: Mode;
  alphabet: AlphabetType;
  includeDakuten: boolean;
  includeYoon: boolean;
  englishOnHover: boolean;
  font: Font;
}

const defaultSettings: Settings = {
  mode: Modes.tableReview,
  alphabet: AlphabetTypes.hiragana,
  includeDakuten: true,
  includeYoon: true,
  englishOnHover: false,
  font: Fonts.notoSansJp,
};

function App() {
  const [showMenu, setShowMenu] = useState(false);

  const storedSettings = JSON.parse(localStorage.getItem("settings") || "{}");

  const [settings, _setSettings] = useState<Settings>(
    Object.keys(storedSettings).length !== 0 ? storedSettings : defaultSettings
  );

  const setSettings = (settings: Settings) => {
    localStorage.setItem("settings", JSON.stringify(settings));
    _setSettings(settings);
  };

  return (
    <div
      className={clsx(
        "layout",
        settings.font && "font-family--" + settings.font.replace(/\s/g, "-")
      )}
    >
      <Nav
        settings={settings}
        setSettings={setSettings}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
      />

      <div className="main">
        {settings.mode === Modes.tableReview && (
          <AlphabetTable settings={settings} />
        )}
        {settings.mode === Modes.typeChars && <TypeChars settings={settings} />}
        {settings.mode === Modes.placeInTable && (
          <PlaceInTable settings={settings} />
        )}
        {settings.mode === Modes.typeWords && (
          <WordBuilder settings={settings} />
        )}
      </div>
    </div>
  );
}

export default App;
