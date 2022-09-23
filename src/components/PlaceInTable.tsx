import React, { useEffect, useState } from "react";
import clsx from "clsx";
import {
  alphabetsColumns,
  alphabets,
  AlphabetTypes,
} from "../library/alphabet";
import { Settings } from "../App";
import { delay, getRandomCharacter, isYoon } from "../utils/utils";
import "./PlaceInTable.scss";

interface Props {
  settings: Settings;
}

interface CurrentCardProps {
  character: string;
  uid: string;
}

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

  async function flashCard(goodGuess: boolean) {
    const pitCard = document.getElementById("pit-table");
    const cssClassCorrect = "pit__table--correct";
    const cssClassIncorrect = "pit__table--incorrect";
    const cssClass = goodGuess ? cssClassCorrect : cssClassIncorrect;

    if (pitCard) {
      pitCard.classList.remove(cssClassCorrect);
      pitCard.classList.remove(cssClassIncorrect);
      await delay(10);
      pitCard.classList.add(cssClass);
    }
  }

  async function checkGuess(guess: string, correctEnglish: string) {
    if (guess === currentCard?.uid) {
      setLastGuess(correctEnglish);
      setGuessedCorrectly(true);
      setLastGuessCorrect(true);
      flashCard(true);
    } else {
      setLastGuess(correctEnglish);
      setLastGuessCorrect(false);
      flashCard(false);
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
        <div id="pit-table" className="pit__table">
          <div className="pit__table__rows">
            {alphabets.map((row, i) => {
              if (row.dakuten && !settings.includeDakuten) return null;

              return (
                <div key={row.title + i} className="pit__table__row">
                  {row.letters.map((cell, i) => {
                    if (isYoon(i) && !settings.includeYoon) return null;

                    return (
                      <div
                        key={i}
                        className={clsx(
                          "cell font-jp",
                          isYoon(i) && "cell--wide",
                          cell === null && "cell--null",
                          cell?.exception && "cell--exception",
                          row.dakuten && "cell--dakuten",
                          settings.englishOnHover && "cell--hover-only"
                        )}
                        onClick={() => {
                          if (!cell) return;
                          checkGuess(cell.en + cell.hg + cell.kk, cell.en);
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
