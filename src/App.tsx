import React, { useState } from "react";
import { TableStudy } from "./components/TableStudy";
import { TypeChars } from "./components/TypeChars";
import { Nav } from "./components/Nav";
import { TableFind } from "./components/TableFind";
import { WordBuilder } from "./components/TypeWords";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";
import { ValueOf } from "./utils/utils";
import clsx from "clsx";
import { Dictionary } from "./components/Dictionary";

export const Modes = {
  tableStudy: "Study table",
  tableFind: "Find in table",
  typeChars: "Type characters",
  typeWords: "Type words",
  dictionary: "Dictionary",
} as const;
export type Mode = ValueOf<typeof Modes>;

export const instructions = {
  [Modes.tableStudy]: "Review the hiragana and katakana characters.",
  [Modes.tableFind]:
    "Find the correct location for the character in the table by clicking the appropriate cell.",
  [Modes.typeChars]:
    "Type the corresponding romaji (English characters) for each character shown. Press Space/Enter or tap the symbol for a hint!",
  [Modes.typeWords]:
    "Type the corresponding romaji (English characters) for each word shown. Press Space/Enter or tap the symbol for a hint!",
  [Modes.dictionary]: "Dictionary of words in Japanese and English.",
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
  showBothAlphabets: boolean;
  font: Font;
}

const defaultSettings: Settings = {
  mode: Modes.tableStudy,
  alphabet: AlphabetTypes.hiragana,
  includeDakuten: true,
  includeYoon: true,
  englishOnHover: false,
  showBothAlphabets: false,
  font: Fonts.notoSansJp,
};

function App() {
  const [showMenu, _setShowMenu] = useState(false);

  function setShowMenu(showMenu: boolean) {
    if (showMenu) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "visible";
    }

    _setShowMenu(showMenu);
  }

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
        <div
          className={clsx(
            "main-inner",
            settings.mode === Modes.dictionary && "main-inner--force-height-100"
          )}
        >
          {settings.mode === Modes.tableStudy && (
            <TableStudy settings={settings} />
          )}
          {settings.mode === Modes.typeChars && (
            <TypeChars settings={settings} />
          )}
          {settings.mode === Modes.tableFind && (
            <TableFind settings={settings} />
          )}
          {settings.mode === Modes.typeWords && <WordBuilder />}
          {settings.mode === Modes.dictionary && <Dictionary />}
        </div>
      </div>
    </div>
  );
}

export default App;
