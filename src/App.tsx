import React, { useState } from "react";
import { AlphabetTable } from "./components/AlphabetTable";
import { JP2EN } from "./components/JP2EN";
import { Nav } from "./components/Nav";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";
import { ValueOf } from "./utils/utils";

export const Modes = {
  tableReview: "Table Review",
  // tableQuiz: "Table Quiz",
  jp2en: "JP to EN Practice",
  // en2jp: "English to Japanese",
} as const;
export type Mode = ValueOf<typeof Modes>;

function App() {
  const [mode, setMode] = useState<Mode>(Modes.tableReview);

  const [alphabet, setAlphabet] = useState<AlphabetType>(
    AlphabetTypes.hiragana
  );
  const [includeDakuten, setIncludeDakuten] = useState(false);
  const [includeYoon, setIncludeYoon] = useState(false);

  return (
    <div className="layout">
      <Nav
        mode={mode}
        setMode={setMode}
        alphabet={alphabet}
        setAlphabet={setAlphabet}
        includeDakuten={includeDakuten}
        setIncludeDakuten={setIncludeDakuten}
        includeYoon={includeYoon}
        setIncludeYoon={setIncludeYoon}
      />

      <div className="main">
        {mode === Modes.tableReview && (
          <AlphabetTable
            alphabet={alphabet}
            includeDakuten={includeDakuten}
            includeYoon={includeYoon}
          />
        )}
        {mode === Modes.jp2en && (
          <JP2EN
            alphabet={alphabet}
            includeDakuten={includeDakuten}
            includeYoon={includeYoon}
          />
        )}
      </div>
    </div>
  );
}

export default App;
