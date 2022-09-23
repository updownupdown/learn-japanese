import clsx from "clsx";
import React, { useState } from "react";
import { AlphabetTable } from "./components/AlphabetTable";
import { JP2EN } from "./components/JP2EN";
import { Nav } from "./components/Nav";
import { PlaceInTable } from "./components/PlaceInTable";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";
import { ValueOf } from "./utils/utils";

export const Modes = {
  tableReview: "Study",
  placeInTable: "Find in table",
  jp2en: "Type the character",
  // en2jp: "English to Japanese",
} as const;
export type Mode = ValueOf<typeof Modes>;

export const instructions = {
  [Modes.tableReview]: "Review the hiragana and katakana characters.",
  [Modes.jp2en]:
    "Type the corresponding romanji (English characters) in the box for each character shown. Press spacebar for a hint!",
  [Modes.placeInTable]:
    "Find the correct location for the character in the table by clicking the appropriate cell.",
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
        {settings.mode === Modes.jp2en && <JP2EN settings={settings} />}
        {settings.mode === Modes.placeInTable && (
          <PlaceInTable settings={settings} />
        )}
      </div>
    </div>
  );
}

export default App;
