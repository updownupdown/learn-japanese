import { Settings } from "../App";
import { alphabets, AlphabetTypes } from "../library/alphabet";
import {
  charsHiragana,
  charsHiraganaDakuten,
  charsHiraganaDakutenYoon,
  charsHiraganaYoon,
  charsKatagana,
  charsKataganaDakuten,
  charsKataganaYoon,
  charsKataganaDakutenYoon,
} from "../library/characters";
import { jp2en } from "../library/jp2en";

export type ValueOf<T> = T[keyof T];

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export function isYoon(i: number) {
  return i > 4;
}

export const newCardDelay = 1650;

interface RandomCharacterProps {
  characterJp: string;
  characterEn: string;
  uid: string;
}

// No longer used; charecter lists compiled in characters.tsx
export const CharacterList = (settings: Settings) => {
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
  let charactersList: RandomCharacterProps[] = [];

  if (settings.alphabet === AlphabetTypes.hiragana) {
    if (!settings.includeDakuten && !settings.includeYoon)
      charactersList = charsHiragana;
    if (settings.includeDakuten && !settings.includeYoon)
      charactersList = charsHiraganaDakuten;
    if (!settings.includeDakuten && settings.includeYoon)
      charactersList = charsHiraganaYoon;
    if (settings.includeDakuten && settings.includeYoon)
      charactersList = charsHiraganaDakutenYoon;
  } else {
    if (!settings.includeDakuten && !settings.includeYoon)
      charactersList = charsKatagana;
    if (settings.includeDakuten && !settings.includeYoon)
      charactersList = charsKataganaDakuten;
    if (!settings.includeDakuten && settings.includeYoon)
      charactersList = charsKataganaYoon;
    if (settings.includeDakuten && settings.includeYoon)
      charactersList = charsKataganaDakutenYoon;
  }

  const randomCharacter =
    charactersList[Math.floor(Math.random() * charactersList.length)];

  return randomCharacter;
}

export async function flashCard(elementId: string, goodGuess: boolean) {
  const tableFindCard = document.getElementById(elementId);
  const cssClassCorrect = "glow-item--correct";
  const cssClassIncorrect = "glow-item--incorrect";
  const cssClass = goodGuess ? cssClassCorrect : cssClassIncorrect;

  if (tableFindCard) {
    tableFindCard.classList.remove(cssClassCorrect);
    tableFindCard.classList.remove(cssClassIncorrect);
    await delay(10);
    tableFindCard.classList.add(cssClass);
  }
}
