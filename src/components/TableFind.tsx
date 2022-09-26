import React, { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { alphabets, AlphabetTypes } from "../library/alphabet";
import { Settings } from "../App";
import {
  flashCard,
  getCharacterDeck,
  getNewDeck,
  isYoon,
  RandomCharacterProps,
  SavedDeck,
} from "../utils/utils";
import "./TableFind.scss";

interface Props {
  settings: Settings;
}

interface CurrentCardProps {
  character: string;
  uid: string;
}

const tableFindId = "table-find";

type Guess = {
  uid: string;
  correctEnglish: string;
};

export const TableFind = ({ settings }: Props) => {
  const [currentCard, setCurrentCard] = useState<CurrentCardProps | undefined>(
    undefined
  );
  const [guess, setGuess] = useState<Guess | undefined>(undefined);
  const [lastGuess, setLastGuess] = useState("");
  const [lastGuessCorrect, setLastGuessCorrect] = useState(false);

  const storedDeck: SavedDeck = JSON.parse(
    localStorage.getItem("findInTableDeck") || "{}"
  );

  const [cardDeck, _setCardDeck] = useState<SavedDeck>(
    storedDeck.deck !== undefined ? storedDeck : getNewDeck(settings)
  );

  const setCardDeck = (deck: SavedDeck) => {
    localStorage.setItem("findInTableDeck", JSON.stringify(deck));
    _setCardDeck(deck);
  };

  const resetDeck = useCallback(() => {
    const newDeck: RandomCharacterProps[] = getCharacterDeck(settings);

    setCardDeck({ deck: newDeck, position: 0, settings });
    setGuess(undefined);
    setLastGuess("");
    setLastGuessCorrect(false);
  }, [settings]);

  useEffect(() => {
    async function checkGuess() {
      if (guess === undefined) {
        getCard(false);
      } else {
        const cellId = "cell-" + guess.uid;

        if (guess.uid === currentCard?.uid) {
          setLastGuess(guess.correctEnglish);
          setLastGuessCorrect(true);
          flashCard(cellId, true);
          flashCard(tableFindId, true);
          getCard(true);
        } else {
          setLastGuess(guess.correctEnglish);
          setLastGuessCorrect(false);
          flashCard(cellId, false);
          flashCard(tableFindId, false);
        }
      }
    }

    const getCard = (next: boolean) => {
      let newPosition = cardDeck.position;
      if (next) newPosition++;

      if (cardDeck.position === cardDeck.deck.length - 1) {
        resetDeck();
        newPosition = 0;
      } else {
        setCardDeck({ ...cardDeck, position: newPosition });
      }

      setCurrentCard({
        character: cardDeck.deck[newPosition].characterEn,
        uid: cardDeck.deck[newPosition].uid,
      });
    };

    checkGuess();
  }, [guess, resetDeck, currentCard?.uid]);

  useEffect(() => {
    const settingsHaveChanged =
      JSON.stringify(settings) !== JSON.stringify(cardDeck.settings);

    if (settingsHaveChanged) resetDeck();
  }, [settings, cardDeck, resetDeck]);

  return (
    <div className="table-find">
      <div className="table-find__top">
        {currentCard && (
          <div className="table-find-card table-find-card--question">
            {currentCard.character}
          </div>
        )}
        {currentCard && (
          <div
            className={clsx(
              "table-find-card table-find-card--guess",
              lastGuessCorrect
                ? "table-find-card--correct"
                : "table-find-card--incorrect"
            )}
          >
            {lastGuess}
          </div>
        )}
      </div>

      <div className="table-find__table-wrap">
        <div
          id={tableFindId}
          className="table-find__table glow-item glow-item--outward"
        >
          <div className="table-find__table__rows">
            {alphabets.map((row, i) => {
              if (row.dakuten && !settings.includeDakuten) return null;

              return (
                <div key={row.title + i} className="table-find__table__row">
                  {row.letters.map((cell, i) => {
                    if (isYoon(i) && !settings.includeYoon) return null;

                    const uid = cell
                      ? cell.en + cell.hg + cell.kk
                      : `cell-${i}`;

                    return (
                      <div
                        key={i}
                        id={`cell-${uid}`}
                        className={clsx(
                          "cell glow-item glow-item--inward",
                          isYoon(i) && "cell--wide",
                          cell === null && "cell--null",
                          cell?.exception && "cell--exception",
                          row.dakuten && "cell--dakuten",
                          settings.englishOnHover && "cell--hover-only"
                        )}
                        onClick={() => {
                          if (!cell) return;
                          setGuess({ uid, correctEnglish: cell.en });
                        }}
                      >
                        <span className="text--kh font-jp">
                          {cell &&
                            (settings.alphabet === AlphabetTypes.hiragana
                              ? cell.hg
                              : cell.kk)}
                        </span>
                        <div className="text--en">{cell && cell.en}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
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
