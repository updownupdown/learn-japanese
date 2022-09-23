import React from "react";
import { Settings } from "../App";
import { alphabets, AlphabetTypes } from "../library/alphabet";

export type ValueOf<T> = T[keyof T];

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function isYoon(i: number) {
  return i > 4;
}

interface RandomCharacterProps {
  characterJp: string;
  characterEn: string;
  uid: string;
}

const CharacterList = (settings: Settings) => {
  let letters: RandomCharacterProps[] = [];

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

      const uniqueId = letter?.en + letter.hg + letter.kk;

      letters.push({
        characterJp: character,
        characterEn: letter.en,
        uid: uniqueId,
      });
    });
  });

  return letters;
};

export function getRandomCharacter(settings: Settings) {
  const characters = CharacterList(settings);

  const randomCharacter =
    characters[Math.floor(Math.random() * characters.length)];

  return randomCharacter;
}
