import React, { useState, useEffect, useCallback } from "react";
import { Settings } from "../App";
import {
  delay,
  flashCard,
  getCharacterDeck,
  getNewDeck,
  newCardDelay,
  RandomCharacterProps,
  SavedDeck,
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

  const storedDeck: SavedDeck = JSON.parse(
    localStorage.getItem("characterDeck") || "{}"
  );

  const [cardDeck, _setCardDeck] = useState<SavedDeck>(
    storedDeck.deck !== undefined ? storedDeck : getNewDeck(settings)
  );

  const setCardDeck = (deck: SavedDeck) => {
    localStorage.setItem("characterDeck", JSON.stringify(deck));
    _setCardDeck(deck);
  };

  const resetDeck = useCallback(() => {
    const newDeck: RandomCharacterProps[] = getCharacterDeck(settings);

    setCardDeck({ deck: newDeck, position: 0, settings });
    setQuestion(newDeck[0].characterJp);
    setAnswer(newDeck[0].characterEn);
    setGuess("");
    setGuessedCorrectly(false);
  }, [settings]);

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

  useEffect(() => {
    const getCard = (next: boolean) => {
      let newPosition = cardDeck.position;
      if (next) newPosition++;

      if (cardDeck.position === cardDeck.deck.length - 1) {
        resetDeck();
        newPosition = 0;
      } else {
        setCardDeck({ ...cardDeck, position: newPosition });
      }

      setQuestion(cardDeck.deck[newPosition].characterJp);
      setAnswer(cardDeck.deck[newPosition].characterEn);
      setGuess("");
      setGuessedCorrectly(false);
    };

    async function checkGuess() {
      if (question === "") {
        getCard(false);
      } else if (guess === answer) {
        flashCard(cardId, true);
        setGuessedCorrectly(true);
        await delay(newCardDelay);
        getCard(true);
      }
    }

    checkGuess();
  }, [guess, answer, question, cardDeck, resetDeck]);

  useEffect(() => {
    const settingsHaveChanged =
      JSON.stringify(settings) !== JSON.stringify(cardDeck.settings);

    if (settingsHaveChanged) resetDeck();
  }, [settings, cardDeck, resetDeck]);

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

      <div className="deck-progress">
        <p>
          {cardDeck.position + 1} of {cardDeck.deck.length}
        </p>

        <div className="deck-progress__bar">
          <span
            className="deck-progress__bar__indicator"
            style={{
              width:
                ((cardDeck.position + 1) / cardDeck.deck.length) * 100 + "%",
            }}
          />
        </div>

        <button
          className="reset-button"
          onClick={() => {
            resetDeck();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
