import React from "react";
import { ValueOf } from "../utils/utils";

export const AlphabetTypes = {
  hiragana: "Hiragana",
  katakana: "Katakana",
} as const;

export type AlphabetType = ValueOf<typeof AlphabetTypes>;

interface TableCell {
  hg: string;
  kk: string;
  en: string;
  exception?: boolean;
}

interface TableRow {
  title: string;
  dakuten: boolean;
  cells: (TableCell | null)[];
}

export const alphabetsColumns = ["a", "i", "u", "e", "o", "ya", "yu", "yo"];

export const alphabets: TableRow[] = [
  {
    title: "∅",
    dakuten: false,
    cells: [
      {
        hg: "あ",
        kk: "ア",
        en: "a",
      },
      {
        hg: "い",
        kk: "イ",
        en: "i",
      },
      {
        hg: "う",
        kk: "ウ",
        en: "u",
      },
      {
        hg: "え",
        kk: "エ",
        en: "e",
      },
      {
        hg: "お",
        kk: "オ",
        en: "o",
      },
      null,
      null,
      null,
    ],
  },
  {
    title: "k",
    dakuten: false,
    cells: [
      {
        hg: "か",
        kk: "カ",
        en: "ka",
      },
      {
        hg: "き",
        kk: "キ",
        en: "ki",
      },
      {
        hg: "く",
        kk: "ク",
        en: "ku",
      },
      {
        hg: "け",
        kk: "ケ",
        en: "ke",
      },
      {
        hg: "こ",
        kk: "コ",
        en: "ko",
      },
      {
        hg: "きゃ",
        kk: "キャ",
        en: "kya",
      },
      {
        hg: "きゅ",
        kk: "キュ",
        en: "kyu",
      },
      {
        hg: "きょ",
        kk: "キョ",
        en: "kyo",
      },
    ],
  },
  {
    title: "g",
    dakuten: true,
    cells: [
      {
        hg: "が",
        kk: "ガ",
        en: "ga",
      },
      {
        hg: "ぎ",
        kk: "ギ",
        en: "gi",
      },
      {
        hg: "ぐ",
        kk: "グ",
        en: "gu",
      },
      {
        hg: "げ",
        kk: "ゲ",
        en: "ge",
      },
      {
        hg: "ご",
        kk: "ゴ",
        en: "go",
      },
      {
        hg: "ぎゃ",
        kk: "ギャ",
        en: "gya",
      },
      {
        hg: "ぎゅ",
        kk: "ギュ",
        en: "gyu",
      },
      {
        hg: "ぎょ",
        kk: "ギョ",
        en: "gyo",
      },
    ],
  },
  {
    title: "s",
    dakuten: false,
    cells: [
      {
        hg: "さ",
        kk: "サ",
        en: "sa",
      },
      {
        hg: "し",
        kk: "シ",
        en: "shi",
        exception: true,
      },
      {
        hg: "す",
        kk: "ス",
        en: "su",
      },
      {
        hg: "せ",
        kk: "セ",
        en: "se",
      },
      {
        hg: "そ",
        kk: "ソ",
        en: "so",
      },
      {
        hg: "しゃ",
        kk: "シャ",
        en: "sha",
        exception: true,
      },
      {
        hg: "しゅ",
        kk: "シュ",
        en: "shu",
        exception: true,
      },
      {
        hg: "しょ",
        kk: "ショ",
        en: "sho",
        exception: true,
      },
    ],
  },
  {
    title: "z",
    dakuten: true,
    cells: [
      {
        hg: "ざ",
        kk: "ザ",
        en: "za",
      },
      {
        hg: "じ",
        kk: "ジ",
        en: "ji",
        exception: true,
      },
      {
        hg: "ず",
        kk: "ズ",
        en: "zu",
      },
      {
        hg: "ぜ",
        kk: "ゼ",
        en: "ze",
      },
      {
        hg: "ぞ",
        kk: "ゾ",
        en: "zo",
      },
      {
        hg: "じゃ",
        kk: "ジャ",
        en: "ja",
        exception: true,
      },
      {
        hg: "じゅ",
        kk: "ジュ",
        en: "ju",
        exception: true,
      },
      {
        hg: "じょ",
        kk: "ジョ",
        en: "jo",
        exception: true,
      },
    ],
  },
  {
    title: "t",
    dakuten: false,
    cells: [
      {
        hg: "た",
        kk: "タ",
        en: "ta",
      },
      {
        hg: "ち",
        kk: "チ",
        en: "chi",
        exception: true,
      },
      {
        hg: "つ",
        kk: "ツ",
        en: "tsu",
        exception: true,
      },
      {
        hg: "て",
        kk: "テ",
        en: "te",
      },
      {
        hg: "と",
        kk: "ト",
        en: "to",
      },
      {
        hg: "ちゃ",
        kk: "チャ",
        en: "cha",
        exception: true,
      },
      {
        hg: "ちゅ",
        kk: "チュ",
        en: "chu",
        exception: true,
      },
      {
        hg: "ちょ",
        kk: "チョ",
        en: "cho",
        exception: true,
      },
    ],
  },
  {
    title: "d",
    dakuten: true,
    cells: [
      {
        hg: "だ",
        kk: "ダ",
        en: "da",
      },
      {
        hg: "ぢ",
        kk: "ヂ",
        en: "ji",
        exception: true,
      },
      {
        hg: "づ",
        kk: "ヅ",
        en: "zu",
        exception: true,
      },
      {
        hg: "で",
        kk: "デ",
        en: "de",
      },
      {
        hg: "ど",
        kk: "ド",
        en: "do",
      },
      {
        hg: "ぢゃ",
        kk: "ヂャ",
        en: "ja",
        exception: true,
      },
      {
        hg: "ぢゅ",
        kk: "ヂュ",
        en: "ju",
        exception: true,
      },
      {
        hg: "ぢょ",
        kk: "ヂョ",
        en: "jo",
        exception: true,
      },
    ],
  },
  {
    title: "n",
    dakuten: false,
    cells: [
      {
        hg: "な",
        kk: "ナ",
        en: "na",
      },
      {
        hg: "に",
        kk: "ニ",
        en: "ni",
      },
      {
        hg: "ぬ",
        kk: "ヌ",
        en: "nu",
      },
      {
        hg: "ね",
        kk: "ネ",
        en: "ne",
      },
      {
        hg: "の",
        kk: "ノ",
        en: "no",
      },
      {
        hg: "にゃ",
        kk: "ニャ",
        en: "nya",
      },
      {
        hg: "にゅ",
        kk: "ニュ",
        en: "nyu",
      },
      {
        hg: "にょ",
        kk: "ニョ",
        en: "nyo",
      },
    ],
  },
  {
    title: "h",
    dakuten: false,
    cells: [
      {
        hg: "は",
        kk: "ハ",
        en: "ha",
      },
      {
        hg: "ひ",
        kk: "ヒ",
        en: "hi",
      },
      {
        hg: "ふ",
        kk: "フ",
        en: "fu",
        exception: true,
      },
      {
        hg: "へ",
        kk: "ヘ",
        en: "he",
      },
      {
        hg: "ほ",
        kk: "ホ",
        en: "ho",
      },
      {
        hg: "ひゃ",
        kk: "ヒャ",
        en: "hya",
      },
      {
        hg: "ひゅ",
        kk: "ヒュ",
        en: "hyu",
      },
      {
        hg: "ひょ",
        kk: "ヒョ",
        en: "hyo",
      },
    ],
  },
  {
    title: "b",
    dakuten: true,
    cells: [
      {
        hg: "ば",
        kk: "バ",
        en: "ba",
      },
      {
        hg: "び",
        kk: "ビ",
        en: "bi",
      },
      {
        hg: "ぶ",
        kk: "ブ",
        en: "bu",
      },
      {
        hg: "べ",
        kk: "ベ",
        en: "be",
      },
      {
        hg: "ぼ",
        kk: "ボ",
        en: "bo",
      },
      {
        hg: "びゃ",
        kk: "ビャ",
        en: "bya",
      },
      {
        hg: "びゅ",
        kk: "ビュ",
        en: "byu",
      },
      {
        hg: "びょ",
        kk: "ビョ",
        en: "byo",
      },
    ],
  },
  {
    title: "p",
    dakuten: true,
    cells: [
      {
        hg: "ぱ",
        kk: "パ",
        en: "pa",
      },
      {
        hg: "ぴ",
        kk: "ピ",
        en: "pi",
      },
      {
        hg: "ぷ",
        kk: "プ",
        en: "pu",
      },
      {
        hg: "ぺ",
        kk: "ペ",
        en: "pe",
      },
      {
        hg: "ぽ",
        kk: "ポ",
        en: "po",
      },
      {
        hg: "ぴゃ",
        kk: "ピャ",
        en: "pya",
      },
      {
        hg: "ぴゅ",
        kk: "ピュ",
        en: "pyu",
      },
      {
        hg: "ぴょ",
        kk: "ピョ",
        en: "pyo",
      },
    ],
  },
  {
    title: "m",
    dakuten: false,
    cells: [
      {
        hg: "ま",
        kk: "マ",
        en: "ma",
      },
      {
        hg: "み",
        kk: "ミ",
        en: "mi",
      },
      {
        hg: "む",
        kk: "ム",
        en: "mu",
      },
      {
        hg: "め",
        kk: "メ",
        en: "me",
      },
      {
        hg: "も",
        kk: "モ",
        en: "mo",
      },
      {
        hg: "みゃ",
        kk: "ミャ",
        en: "mya",
      },
      {
        hg: "みゅ",
        kk: "ミュ",
        en: "myu",
      },
      {
        hg: "みょ",
        kk: "ミョ",
        en: "myo",
      },
    ],
  },
  {
    title: "y",
    dakuten: false,
    cells: [
      {
        hg: "や",
        kk: "ヤ",
        en: "ya",
      },
      null,
      {
        hg: "ゆ",
        kk: "ユ",
        en: "yu",
      },
      null,
      {
        hg: "よ",
        kk: "ヨ",
        en: "yo",
      },
      null,
      null,
      null,
    ],
  },
  {
    title: "r",
    dakuten: false,
    cells: [
      {
        hg: "ら",
        kk: "ラ",
        en: "ra",
      },
      {
        hg: "り",
        kk: "リ",
        en: "ri",
      },
      {
        hg: "る",
        kk: "ル",
        en: "ru",
      },
      {
        hg: "れ",
        kk: "レ",
        en: "re",
      },
      {
        hg: "ろ",
        kk: "ロ",
        en: "ro",
      },
      {
        hg: "りゃ",
        kk: "リャ",
        en: "rya",
      },
      {
        hg: "りゅ",
        kk: "リュ",
        en: "ryu",
      },
      {
        hg: "りょ",
        kk: "リョ",
        en: "ryo",
      },
    ],
  },
  {
    title: "w",
    dakuten: false,
    cells: [
      {
        hg: "わ",
        kk: "ワ",
        en: "wa",
      },
      {
        hg: "ゐ",
        kk: "ヰ",
        en: "wi",
      },
      null,
      {
        hg: "ゑ",
        kk: "ヱ",
        en: "we",
      },
      {
        hg: "を",
        kk: "ヲ",
        en: "wo",
        exception: true,
      },
      null,
      null,
      null,
    ],
  },
  {
    title: "",
    dakuten: false,
    cells: [
      {
        hg: "ん",
        kk: "ン",
        en: "n",
      },

      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
];
