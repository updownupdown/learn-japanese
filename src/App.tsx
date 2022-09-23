import React, { useState } from "react";
import { AlphabetTable } from "./components/AlphabetTable";
import { Checkbox } from "./components/Checkbox";
import { Toggle, ToggleGroup } from "./components/Toggle";
import { AlphabetType, AlphabetTypes } from "./library/alphabet";

function App() {
  const [alphabet, setAlphabet] = useState<AlphabetType>(
    AlphabetTypes.hiragana
  );
  const [includeDakuten, setIncludeDakuten] = useState(false);
  const [includeYoon, setIncludeYoon] = useState(false);

  return (
    <div className="main">
      <div className="main__toggles">
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
      </div>

      <AlphabetTable
        alphabet={alphabet}
        includeDakuten={includeDakuten}
        includeYoon={includeYoon}
      />
    </div>
  );
}

export default App;
