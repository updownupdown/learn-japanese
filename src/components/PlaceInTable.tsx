import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  alphabetsColumns,
  alphabets,
  AlphabetTypes,
} from "../library/alphabet";
import { Settings } from "../App";
import { delay, flashCard, getRandomCharacter, isYoon } from "../utils/utils";
import "./PlaceInTable.scss";

interface Props {
  settings: Settings;
}

interface CurrentCardProps {
  character: string;
  uid: string;
}

const placeInTableId = "place-in-table";

export const PlaceInTable = ({ settings }: Props) => {
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
      flashCard(placeInTableId, true);
    } else {
      setLastGuess(correctEnglish);
      setLastGuessCorrect(false);
      flashCard(cellId, false);
      flashCard(placeInTableId, false);
    }
  }

  return (
    <div className="pit">
      <div className="pit__top">
        {currentCard && (
          <div className="pit-card pit-card--question">
            {currentCard.character}
          </div>
        )}
        {currentCard && (
          <div
            className={clsx(
              "pit-card pit-card--guess",
              lastGuessCorrect ? "pit-card--correct" : "pit-card--incorrect"
            )}
          >
            {lastGuess}
          </div>
        )}
      </div>

      <div className="pit__table-wrap">
        <div
          id={placeInTableId}
          className="pit__table glow-item glow-item--outward"
        >
          <div className="pit__table__rows">
            {alphabets.map((row, i) => {
              if (row.dakuten && !settings.includeDakuten) return null;

              return (
                <div key={row.title + i} className="pit__table__row">
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
