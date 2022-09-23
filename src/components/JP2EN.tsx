import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { alphabets, AlphabetType, AlphabetTypes } from "../library/alphabet";
import { isYoon } from "./AlphabetTable";
import { Checkbox } from "./Checkbox";
import "./JP2EN.scss";

interface Props {
  alphabet: AlphabetType;
  includeDakuten: boolean;
  includeYoon: boolean;
}

interface QuestionProps {
  question: string;
  answer: string;
}

export const JP2EN = ({ alphabet, includeDakuten, includeYoon }: Props) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [guess, setGuess] = useState("");
  const [guessedCorrectly, setGuessedCorrectly] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);

  function checkGuess() {
    if (answer !== "" && guess === answer) {
      setGuessedCorrectly(true);
      if (autoAdvance) getNewCard();
    }
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      if (guessedCorrectly) getNewCard();
    } else if (event.key === " " && !guessedCorrectly) {
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
          (row.dakuten && !includeDakuten) ||
          (isYoon(i) && !includeYoon)
        )
          return;

        const character =
          alphabet === AlphabetTypes.hiragana ? letter.hg : letter.kk;

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
  }, [alphabet, includeDakuten, includeYoon]);

  useEffect(() => {
    checkGuess();
  }, [guess]);

  return (
    <div className="jp2en">
      <div className="jp2en-card">
        <div className="jp2en-card__jp">{question}</div>

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

        <button
          className="button"
          onClick={() => getNewCard()}
          disabled={!guessedCorrectly}
        >
          Next
        </button>

        <Checkbox
          label="Auto-advance"
          name="auto-advance"
          onChange={() => {
            if (!autoAdvance && guessedCorrectly) getNewCard();
            setAutoAdvance(!autoAdvance);
          }}
          isChecked={autoAdvance}
        />
      </div>
    </div>
  );
};
