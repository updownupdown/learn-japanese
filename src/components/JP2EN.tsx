import React, { useState, useEffect } from "react";
import { Settings } from "../App";
import { delay, getRandomCharacter, isYoon } from "../utils/utils";
import clsx from "clsx";
import "./JP2EN.scss";

interface Props {
  settings: Settings;
}

export const JP2EN = ({ settings }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  async function checkGuess() {
    if (answer !== "" && guess === answer) {
      setGuessedCorrectly(true);
      await delay(2000);
      getNewCard();
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === " " && !guessedCorrectly) {
      event.preventDefault();

      const nextLetter = answer[guess.length];
      let updateValue = guess + nextLetter;

      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== answer[i]) {
          updateValue = answer[0];
        }
      }

      setGuess(updateValue);
    } else if (
      guessedCorrectly ||
      (guess.length === 3 &&
        !(event.key === "Backspace" || event.key === "Delete"))
    ) {
      event.preventDefault();
    }
  };

  function getNewCard() {
    const randomCharacter = getRandomCharacter(settings);

    setQuestion(randomCharacter.characterJp);
    setAnswer(randomCharacter.characterEn);
    setGuess("");
    setGuessedCorrectly(false);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    getNewCard();
  }, [settings]);

  useEffect(() => {
    checkGuess();
  }, [guess]);

  return (
    <div className="jp2en">
      <div className="jp2en-card">
        <div className="jp2en-card__jp font-jp">{question}</div>

        <input
          autoFocus
          spellCheck="false"
          className={clsx("input", guessedCorrectly && "input--success")}
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />

        <div
          className={clsx(
            "jp2en-card__delay",
            guessedCorrectly
              ? "jp2en-card__delay--correct"
              : "jp2en-card__delay--incorrect"
          )}
        />
      </div>
    </div>
  );
};
