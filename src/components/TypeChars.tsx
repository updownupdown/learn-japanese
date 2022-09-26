import React, { useState, useEffect, useCallback } from "react";
import { Settings } from "../App";
import {
  delay,
  flashCard,
  getRandomCharacter,
  newCardDelay,
} from "../utils/utils";
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

  const getHint = useCallback(() => {
    const nextLetter = answer[guess.length];
    let updateValue = guess + nextLetter;

    for (let i = 0; i < guess.length; i++) {
      if (guess[i] !== answer[i]) {
        updateValue = answer[0];
      }
    }

    setGuess(updateValue);
  }, [answer, guess]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === " " || e.code === "Space" || e.key === "Enter") &&
        !guessedCorrectly
      ) {
        e.preventDefault();
        getHint();
      } else if (
        guessedCorrectly ||
        (guess.length === 3 && !(e.key === "Backspace" || e.key === "Delete"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [answer, guess, guessedCorrectly, getHint]);

  const getNewCard = useCallback(() => {
    const randomCharacter = getRandomCharacter(settings);

    setQuestion(randomCharacter.characterJp);
    setAnswer(randomCharacter.characterEn);
    setGuess("");
    setGuessedCorrectly(false);
  }, [settings]);

  useEffect(() => {
    async function checkGuess() {
      if (question === "") {
        getNewCard();
      } else if (answer !== "" && guess === answer) {
        flashCard(cardId, true);
        setGuessedCorrectly(true);
        await delay(newCardDelay);
        getNewCard();
      }
    }

    checkGuess();
  }, [guess, answer, question, getNewCard]);

  useEffect(() => {
    getNewCard();
  }, [settings, getNewCard]);

  return (
    <div className="type-chars">
      <div id={cardId} className="card-wrap glow-item glow-item--outward">
        <div className="card">
          <div
            className={clsx(
              "type-chars-card__jp font-jp",
              guessedCorrectly && "type-chars-card__jp--no-hint"
            )}
            onClick={() => getHint()}
          >
            {question}
          </div>
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
        </div>
      </div>
    </div>
  );
};
