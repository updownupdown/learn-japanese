import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { Settings } from "../App";
import { alphabets, AlphabetType, AlphabetTypes } from "../library/alphabet";
import { delay } from "../utils/utils";
import { isYoon } from "./AlphabetTable";
import { Checkbox } from "./Checkbox";
import "./JP2EN.scss";

interface Props {
  settings: Settings;
}

interface QuestionProps {
  question: string;
  answer: string;
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
      const nextLetter = answer[guess.length];
      event.preventDefault();
      setGuess(guess + nextLetter);
    } else if (guessedCorrectly) {
      event.preventDefault();
    }
  };

  function getNewCard() {
    let letters: QuestionProps[] = [];

    alphabets.forEach((row) => {
      row.letters.forEach((letter, i) => {
        if (
          letter === null ||
          (row.dakuten && !settings.includeDakuten) ||
          (isYoon(i) && !settings.includeYoon)
        )
          return;

        const character =
          settings.alphabet === AlphabetTypes.hiragana ? letter.hg : letter.kk;

        letters.push({ question: character, answer: letter.en });
      });
    });

    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    setQuestion(randomLetter.question);
    setAnswer(randomLetter.answer);
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
            console.log(e.target.value);
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
