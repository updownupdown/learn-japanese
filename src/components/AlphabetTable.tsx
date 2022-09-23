import React from "react";
import clsx from "clsx";
import {
  alphabetsColumns,
  alphabets,
  AlphabetType,
  AlphabetTypes,
} from "../library/alphabet";
import "./AlphabetTable.scss";

interface Props {
  alphabet: AlphabetType;
  includeDakuten: boolean;
  includeYoon: boolean;
}

function isYoon(i: number) {
  return i > 4;
}

export const AlphabetTable = ({
  alphabet,
  includeDakuten,
  includeYoon,
}: Props) => {
  return (
    <div className="table">
      <div className="table__headers">
        {alphabetsColumns.map((col, i) => {
          if (isYoon(i) && !includeYoon) return null;

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
          if (row.dakuten && !includeDakuten) return null;

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

              {row.cells.map((cell, i) => {
                if (isYoon(i) && !includeYoon) return null;

                return (
                  <div
                    key={i}
                    className={clsx(
                      "cell",
                      isYoon(i) && "cell--wide",
                      cell === null && "cell--null",
                      cell?.exception && "cell--exception",
                      row.dakuten && "cell--dakuten"
                    )}
                  >
                    {cell && (
                      <>
                        {alphabet === AlphabetTypes.hiragana ? (
                          <span className="jp hg">{cell.hg}</span>
                        ) : (
                          <span className="jp kk">{cell.kk}</span>
                        )}
                        <span className="en">{cell.en}</span>
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
