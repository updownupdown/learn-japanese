import clsx from "clsx";
import React, { useState } from "react";
import { AlphabetTable } from "./components/AlphabetTable";
import { JP2EN } from "./components/JP2EN";
import { Nav } from "./components/Nav";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";
import { ValueOf } from "./utils/utils";

export const Modes = {
  tableReview: "Table Review",
  // tableQuiz: "Table Quiz",
  jp2en: "JP to EN Quiz",
  // en2jp: "English to Japanese",
} as const;
export type Mode = ValueOf<typeof Modes>;

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
        "font-family--" + settings.font.replace(/\s/g, "-")
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
      </div>
    </div>
  );
}

export default App;
