import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { alphabets, AlphabetTypes } from "../library/alphabet";
import { Settings } from "../App";
import { flashCard, getRandomCharacter, isYoon } from "../utils/utils";
import "./TableFind.scss";

interface Props {
  settings: Settings;
}

interface CurrentCardProps {
  character: string;
  uid: string;
}

const tableFindId = "table-find";

export const TableFind = ({ settings }: Props) => {
  const [currentCard, setCurrentCard] = useState<CurrentCardProps | undefined>(
    undefined
  );
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [lastGuess, setLastGuess] = useState("");
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);

  useEffect(() => {
    const randomCharacter = getRandomCharacter(settings);

    setGuessedCorrectly(false);

    setCurrentCard({
      character: randomCharacter.characterEn,
      uid: randomCharacter.uid,
    });
  }, [guessedCorrectly, settings]);

  async function checkGuess(uid: string, correctEnglish: string) {
    const cellId = "cell-" + uid;

    if (uid === currentCard?.uid) {
      setLastGuess(correctEnglish);
      setGuessedCorrectly(true);
      setLastGuessCorrect(true);
      flashCard(cellId, true);
      flashCard(tableFindId, true);
    } else {
      setLastGuess(correctEnglish);
      setLastGuessCorrect(false);
      flashCard(cellId, false);
      flashCard(tableFindId, false);
    }
  }

  return (
    <div className="table-find">
      <div className="table-find__top">
        {currentCard && (
          <div className="table-find-card table-find-card--question">
            {currentCard.character}
          </div>
        )}
        {currentCard && (
          <div
            className={clsx(
              "table-find-card table-find-card--guess",
              lastGuessCorrect
                ? "table-find-card--correct"
                : "table-find-card--incorrect"
            )}
          >
            {lastGuess}
          </div>
        )}
      </div>

      <div className="table-find__table-wrap">
        <div
          id={tableFindId}
          className="table-find__table glow-item glow-item--outward"
        >
          <div className="table-find__table__rows">
            {alphabets.map((row, i) => {
              if (row.dakuten && !settings.includeDakuten) return null;

              return (
                <div key={row.title + i} className="table-find__table__row">
                  {row.letters.map((cell, i) => {
                    if (isYoon(i) && !settings.includeYoon) return null;

                    const uid = cell
                      ? cell.en + cell.hg + cell.kk
                      : `cell-${i}`;

                    return (
                      <div
                        key={i}
                        id={`cell-${uid}`}
                        className={clsx(
                          "cell font-jp glow-item glow-item--inward",
                          isYoon(i) && "cell--wide",
                          cell === null && "cell--null",
                          cell?.exception && "cell--exception",
                          row.dakuten && "cell--dakuten",
                          settings.englishOnHover && "cell--hover-only"
                        )}
                        onClick={() => {
                          if (!cell) return;
                          checkGuess(uid, cell.en);
                        }}
                      >
                        {cell &&
                          (settings.alphabet === AlphabetTypes.hiragana
                            ? cell.hg
                            : cell.kk)}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
