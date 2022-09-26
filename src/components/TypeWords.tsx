import React, { useCallback, useEffect, useState } from "react";
import { wordList } from "../library/wordList";
import { delay, flashCard, newCardDelay } from "../utils/utils";
import clsx from "clsx";
import "./TypeWords.scss";
import { toRomaji } from "wanakana";

type Answer = {
  japanese: string;
  english: string;
};

const cardId = "wp-card";

export const WordBuilder = () => {
  const [word, setWord] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Answer | undefined>(undefined);
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  const getHint = useCallback(() => {
    if (answer === undefined) return;

    const nextLetter = answer.english[guess.length];
    let updateValue = guess + nextLetter;

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== answer.english[i]) {
        updateValue = answer.english[0];
      }
    }

    setGuess(updateValue);
  }, [answer, guess]);

  useEffect(() => {
    function getRandomWord() {
      const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

      setWord(randomWord);
      setAnswer({
        japanese: randomWord[0],
        english: toRomaji(randomWord[0]),
      });
      setGuess("");
      setGuessedCorrectly(false);
    }

    async function checkGuess() {
      if (guess === answer!.english) {
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
      console.log(e);
      if (
        (e.key === " " || e.code === "Space" || e.key === "Enter") &&
        !guessedCorrectly
      ) {
        e.preventDefault();
        getHint();
      } else if (guessedCorrectly) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [guessedCorrectly, answer, guess, getHint]);

  return (
    <div className="wb">
      <span className="wb__translation">{word[2]}</span>
      <span className="wb__kanji font-jp">{word[1]}</span>

      <div id={cardId} className="card-wrap glow-item glow-item--outward">
        <div className="card wb-card">
          <span
            className={clsx(
              "wb-card__hk font-jp",
              guessedCorrectly && "wb-card__hk--no-hint"
            )}
            onClick={() => getHint()}
          >
            {word.length &&
              word[0]
                .split("")
                .map((char, i) => <span key={char + i}>{char}</span>)}
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

          <span className="wb-card__en">{answer?.english}</span>
        </div>
      </div>
    </div>
  );
};
