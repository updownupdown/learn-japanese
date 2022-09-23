import React from "react";
import { Table } from "../components/HiraganaTable";

export const hiraganaMonographs: Table = {
  title: "Monographs (gojūon)",
  columns: ["a", "i", "u", "e", "o"],
  rows: {
    "∅": [
      {
        jp: "あ",
        en: "a",
      },
      {
        jp: "い",
        en: "i",
      },
      {
        jp: "う",
        en: "u",
      },
      {
        jp: "え",
        en: "e",
      },
      {
        jp: "お",
        en: "o",
      },
    ],
    k: [
      {
        jp: "か",
        en: "ka",
      },
      {
        jp: "き",
        en: "ki",
      },
      {
        jp: "く",
        en: "ku",
      },
      {
        jp: "け",
        en: "ke",
      },
      {
        jp: "こ",
        en: "ko",
      },
    ],
    s: [
      {
        jp: "さ",
        en: "sa",
      },
      {
        jp: "し",
        en: "shi",
        exception: true,
      },
      {
        jp: "す",
        en: "su",
      },
      {
        jp: "せ",
        en: "se",
      },
      {
        jp: "そ",
        en: "so",
      },
    ],
    t: [
      {
        jp: "た",
        en: "ta",
      },
      {
        jp: "ち",
        en: "chi",
        exception: true,
      },
      {
        jp: "つ",
        en: "tsu",
        exception: true,
      },
      {
        jp: "て",
        en: "te",
      },
      {
        jp: "と",
        en: "to",
      },
    ],
    n: [
      {
        jp: "な",
        en: "na",
      },
      {
        jp: "に",
        en: "ni",
      },
      {
        jp: "ぬ",
        en: "nu",
      },
      {
        jp: "ね",
        en: "ne",
      },
      {
        jp: "の",
        en: "no",
      },
    ],
    h: [
      {
        jp: "は",
        en: "ha",
      },
      {
        jp: "ひ",
        en: "hi",
      },
      {
        jp: "ふ",
        en: "fu",
        exception: true,
      },
      {
        jp: "へ",
        en: "he",
      },
      {
        jp: "ほ",
        en: "ho",
      },
    ],
    m: [
      {
        jp: "ま",
        en: "ma",
      },
      {
        jp: "み",
        en: "mi",
      },
      {
        jp: "む",
        en: "mu",
      },
      {
        jp: "め",
        en: "me",
      },
      {
        jp: "も",
        en: "mo",
      },
    ],
    y: [
      {
        jp: "や",
        en: "ya",
      },
      null,
      {
        jp: "ゆ",
        en: "yu",
      },
      null,
      {
        jp: "よ",
        en: "yo",
      },
    ],
    r: [
      {
        jp: "ら",
        en: "ra",
      },
      {
        jp: "り",
        en: "ri",
      },
      {
        jp: "る",
        en: "ru",
      },
      {
        jp: "れ",
        en: "re",
      },
      {
        jp: "ろ",
        en: "ro",
      },
    ],
    w: [
      {
        jp: "わ",
        en: "wa",
      },
      {
        jp: "ゐ",
        en: "wi",
      },
      null,
      {
        jp: "ゑ",
        en: "we",
      },
      {
        jp: "を",
        en: "o",
        exception: true,
      },
    ],
  },
};

export const hiraganaDigraphs: Table = {
  title: "Digraphs (yōon)",
  wide: true,
  columns: ["ya", "yu", "yo"],
  rows: {
    "∅": [null, null, null],
    k: [
      {
        jp: "きゃ",
        en: "kya",
      },
      {
        jp: "きゅ",
        en: "kyu",
      },
      {
        jp: "きょ",
        en: "kyo",
      },
    ],
    s: [
      {
        jp: "しゃ",
        en: "sha",
        exception: true,
      },
      {
        jp: "しゅ",
        en: "shu",
        exception: true,
      },
      {
        jp: "しょ",
        en: "sho",
        exception: true,
      },
    ],
    t: [
      {
        jp: "ちゃ",
        en: "cha",
        exception: true,
      },
      {
        jp: "ちゅ",
        en: "chu",
        exception: true,
      },
      {
        jp: "ちょ",
        en: "cho",
        exception: true,
      },
    ],
    n: [
      {
        jp: "にゃ",
        en: "nya",
      },
      {
        jp: "にゅ",
        en: "nyu",
      },
      {
        jp: "にょ",
        en: "nyo",
      },
    ],
    h: [
      {
        jp: "ひゃ",
        en: "hya",
      },
      {
        jp: "ひゅ",
        en: "hyu",
      },
      {
        jp: "ひょ",
        en: "hyo",
      },
    ],
    m: [
      {
        jp: "みゃ",
        en: "mya",
      },
      {
        jp: "みゅ",
        en: "myu",
      },
      {
        jp: "みょ",
        en: "myo",
      },
    ],
    y: [null, null, null],
    r: [
      {
        jp: "りゃ",
        en: "a",
      },
      {
        jp: "りゅ",
        en: "u",
      },
      {
        jp: "りょ",
        en: "o",
      },
    ],
    w: [null, null, null],
  },
};

export const hiraganaDiacritics: Table = {
  title: "Diacritics (gojūon with (han)dakuten)",
  columns: ["a", "i", "u", "e", "o"],
  rows: {
    g: [
      {
        jp: "が",
        en: "ga",
      },
      {
        jp: "ぎ",
        en: "gi",
      },
      {
        jp: "ぐ",
        en: "gu",
      },
      {
        jp: "げ",
        en: "ge",
      },
      {
        jp: "ご",
        en: "go",
      },
    ],
    z: [
      {
        jp: "ざ",
        en: "za",
      },
      {
        jp: "じ",
        en: "ji",
        exception: true,
      },
      {
        jp: "ず",
        en: "zu",
      },
      {
        jp: "ぜ",
        en: "ze",
      },
      {
        jp: "ぞ",
        en: "zo",
      },
    ],
    d: [
      {
        jp: "だ",
        en: "da",
      },
      {
        jp: "ぢ",
        en: "ji",
        exception: true,
      },
      {
        jp: "づ",
        en: "zu",
        exception: true,
      },
      {
        jp: "で",
        en: "de",
      },
      {
        jp: "ど",
        en: "do",
      },
    ],
    b: [
      {
        jp: "ば",
        en: "ba",
      },
      {
        jp: "び",
        en: "bi",
      },
      {
        jp: "ぶ",
        en: "bu",
      },
      {
        jp: "べ",
        en: "be",
      },
      {
        jp: "ぼ",
        en: "bo",
      },
    ],
    p: [
      {
        jp: "ぱ",
        en: "pa",
      },
      {
        jp: "ぴ",
        en: "pi",
      },
      {
        jp: "ぷ",
        en: "pu",
      },
      {
        jp: "ぺ",
        en: "pe",
      },
      {
        jp: "ぽ",
        en: "po",
      },
    ],
  },
};

export const hiraganaDigraphsDiacritic: Table = {
  title: "Digraphs with diacritics (yōon with (han)dakuten)",
  wide: true,
  columns: ["ya", "yu", "yo"],
  rows: {
    g: [
      {
        jp: "ぎゃ",
        en: "gya",
      },
      {
        jp: "ぎゅ",
        en: "gyu",
      },
      {
        jp: "ぎょ",
        en: "gyo",
      },
    ],
    z: [
      {
        jp: "じゃ",
        en: "ja",
        exception: true,
      },
      {
        jp: "じゅ",
        en: "ju",
        exception: true,
      },
      {
        jp: "じょ",
        en: "jo",
        exception: true,
      },
    ],
    d: [
      {
        jp: "ぢゃ",
        en: "ja",
        exception: true,
      },
      {
        jp: "ぢゅ",
        en: "ju",
        exception: true,
      },
      {
        jp: "ぢょ",
        en: "jo",
        exception: true,
      },
    ],
    b: [
      {
        jp: "びゃ",
        en: "bya",
      },
      {
        jp: "びゅ",
        en: "byu",
      },
      {
        jp: "びょ",
        en: "byo",
      },
    ],
    p: [
      {
        jp: "ぴゃ",
        en: "pya",
      },
      {
        jp: "ぴゅ",
        en: "pyu",
      },
      {
        jp: "ぴょ",
        en: "pyo",
      },
    ],
  },
};
