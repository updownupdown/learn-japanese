import React, { useEffect, useState } from "react";
import { wordList } from "../library/wordList";
import {
  breakUpCharacters,
  delay,
  flashCard,
  newCardDelay,
} from "../utils/utils";
import clsx from "clsx";
import "./TypeWords.scss";

type Answer = {
  japanese: string[];
  english: string[];
  expectedInput: string;
};

const cardId = "wp-card";

export const WordBuilder = () => {
  const [word, setWord] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Answer | undefined>(undefined);
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  useEffect(() => {
    function getRandomWord() {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
      const charBreakUp = breakUpCharacters(randomWord[0]);
      let expectedInput: string[] = [];

      charBreakUp.english.forEach((char) => {
        if (!char.includes("(")) expectedInput.push(char);
      });

      setWord(randomWord);
      setAnswer({
        japanese: charBreakUp.japanese,
        english: charBreakUp.english,
        expectedInput: expectedInput.join(""),
      });
      setGuess("");
      setGuessedCorrectly(false);
    }

    async function checkGuess() {
      if (guess === answer!.expectedInput) {
        flashCard(cardId, true);
        setGuessedCorrectly(true);
        await delay(newCardDelay);
        getRandomWord();
      }
    }

    if (!word.length) {
      getRandomWord();
    } else if (answer) {
      checkGuess();
    }
  }, [guess, word, answer]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === " " ||
        e.code === "Space" ||
        e.key === "Undefined" ||
        guessedCorrectly
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedCorrectly]);

  return (
    <div className="wb">
      <span className="wb__translation">{word[2]}</span>
      <span className="wb__kanji font-jp">{word[1]}</span>

      <div id={cardId} className="card-wrap glow-item glow-item--outward">
        <div className="card wb-card">
          <span className="wb-card__hk font-jp">
            {word.length &&
              word[0]
                .split("")
                .map((char, i) => <span key={char + i}>{char}</span>)}
          </span>

          <span className="wb-card__breakup">
            {answer?.english.map((char, i) => {
              return (
                <span key={i} className={clsx(char.includes("(") && "bracket")}>
                  {char}
                </span>
              );
            })}
          </span>

          <input
            type="text"
            autoFocus
            spellCheck="false"
            className={clsx(
              "large-input",
              guessedCorrectly && "large-input--success"
            )}
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value.toLowerCase());
            }}
          />

          <span className="wb-card__en">{answer?.expectedInput}</span>
        </div>
      </div>
    </div>
  );
};
