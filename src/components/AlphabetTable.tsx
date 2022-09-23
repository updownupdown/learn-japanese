import React from "react";
import clsx from "clsx";
import {
  alphabetsColumns,
  alphabets,
  AlphabetTypes,
} from "../library/alphabet";
import "./AlphabetTable.scss";
import { Settings } from "../App";

interface Props {
  settings: Settings;
}

export function isYoon(i: number) {
  return i > 4;
}

export const AlphabetTable = ({ settings }: Props) => {
  return (
    <div className="table">
      <div className="table__headers">
        {alphabetsColumns.map((col, i) => {
          if (isYoon(i) && !settings.includeYoon) return null;

          return (
            <span
              key={col}
              className={clsx("table__header", i > 4 && "table__header--wide")}
            >
              {col}
            </span>
          );
        })}
      </div>

      <div className="table__rows">
        {alphabets.map((row, i) => {
          if (row.dakuten && !settings.includeDakuten) return null;

          return (
            <div key={row.title + i} className="table__row">
              <span
                className={clsx(
                  "table__row__legend",
                  row.dakuten && "table__row__legend--dakuten"
                )}
              >
                {row.title}
              </span>

              {row.letters.map((cell, i) => {
                if (isYoon(i) && !settings.includeYoon) return null;

                return (
                  <div
                    key={i}
                    className={clsx(
                      "cell",
                      isYoon(i) && "cell--wide",
                      cell === null && "cell--null",
                      cell?.exception && "cell--exception",
                      row.dakuten && "cell--dakuten",
                      settings.englishOnHover && "cell--hover-only"
                    )}
                  >
                    {cell && (
                      <>
                        {settings.alphabet === AlphabetTypes.hiragana ? (
                          <span
                            className={clsx(
                              "cell__character cell__character--jp font-jp",
                              settings.englishOnHover &&
                                "cell__character--hover-only"
                            )}
                          >
                            {cell.hg}
                          </span>
                        ) : (
                          <span
                            className={clsx(
                              "cell__character cell__character--jp font-jp",
                              settings.englishOnHover &&
                                "cell__character--hover-only"
                            )}
                          >
                            {cell.kk}
                          </span>
                        )}
                        <span
                          className={clsx(
                            "cell__character cell__character--en",
                            settings.englishOnHover &&
                              "cell__character--hover-only"
                          )}
                        >
                          {cell.en}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
