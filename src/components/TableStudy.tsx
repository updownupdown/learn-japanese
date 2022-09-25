import React from "react";
import clsx from "clsx";
import {
  alphabetsColumns,
  alphabets,
  AlphabetTypes,
} from "../library/alphabet";
import { Settings } from "../App";
import { isYoon } from "../utils/utils";
import "./TableStudy.scss";

interface Props {
  settings: Settings;
}

export const TableStudy = ({ settings }: Props) => {
  return (
    <div className="table-study-wrap">
      <div className="table">
        <div className="table-study__headers">
          {alphabetsColumns.map((col, i) => {
            if (isYoon(i) && !settings.includeYoon) return null;

            return (
              <span
                key={col}
                className={clsx(
                  "table-study__header",
                  i > 4 && "table-study__header--wide"
                )}
              >
                {col}
              </span>
            );
          })}
        </div>

        <div className="table-study__rows">
          {alphabets.map((row, i) => {
            if (row.dakuten && !settings.includeDakuten) return null;

            return (
              <div key={row.title + i} className="table-study__row">
                <span
                  className={clsx(
                    "table-study__row__legend",
                    row.dakuten && "table-study__row__legend--dakuten"
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
    </div>
  );
};
