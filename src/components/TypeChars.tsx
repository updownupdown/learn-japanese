import React, { useState, useEffect } from "react";
import { Settings } from "../App";
import { delay, flashCard, getRandomCharacter } from "../utils/utils";
import clsx from "clsx";
import "./TypeChars.scss";

interface Props {
  settings: Settings;
}

const cardId = "type-chars-card";

export const TypeChars = ({ settings }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);

  function getNewCard() {
    const randomCharacter = getRandomCharacter(settings);

    setQuestion(randomCharacter.characterJp);
    setAnswer(randomCharacter.characterEn);
    setGuess("");
    setGuessedCorrectly(false);
  }

  async function checkGuess() {
    if (answer !== "" && guess === answer) {
      flashCard(cardId, true);
      setGuessedCorrectly(true);
      await delay(2000);
      getNewCard();
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (
      (e.key == " " || e.code == "Space" || e.keyCode == 32) &&
      !guessedCorrectly
    ) {
      e.preventDefault();

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
      (guess.length === 3 && !(e.key === "Backspace" || e.key === "Delete"))
    ) {
      e.preventDefault();
    }
  };

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
    <div className="type-chars">
      <div id={cardId} className="card-wrap glow-item glow-item--outward">
        <div className="card">
          <div className="type-chars-card__jp font-jp">{question}</div>

          <input
            autoComplete="off"
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
        </div>
      </div>
    </div>
  );
};
