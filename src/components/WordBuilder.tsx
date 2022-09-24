import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Settings } from "../App";
import { jp2en } from "../library/jp2en";
import { wordList } from "../library/wordList";
import { breakUpCharacters, delay, flashCard } from "../utils/utils";
import "./WordBuilder.scss";

interface Props {
  settings: Settings;
}

type Answer = {
  japanese: string[];
  english: string[];
  expectedInput: string;
};

const cardId = "wp-card";

export const WordBuilder = (settings: Props) => {
  const [word, setWord] = useState<string[]>([]);
  const [answer, setAnswer] = useState<Answer | undefined>(undefined);
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  function getRandomWord() {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    // const randomWord = ["せっかち", "せっかち", "impatient"];
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
    if (guess === answer?.expectedInput) {
      flashCard(cardId, true);
      setGuessedCorrectly(true);
      await delay(2000);
      getRandomWord();
    }
  }

  useEffect(() => {
    getRandomWord();
  }, []);

  useEffect(() => {
    checkGuess();
  }, [guess]);

  const handleKeyPress = (event: KeyboardEvent) => {
    if (guessedCorrectly) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
            autoFocus
            spellCheck="false"
            className={clsx(
              "large-input",
              guessedCorrectly && "large-input--success"
            )}
            value={guess}
            onChange={(e) => {
              setGuess(e.target.value);
            }}
          />

          <span className="wb-card__en">{answer?.expectedInput}</span>
        </div>
      </div>
    </div>
  );
};
