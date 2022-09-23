import clsx from "clsx";
import React from "react";
import {
  hiraganaDiacritics,
  hiraganaDigraphs,
  hiraganaDigraphsDiacritic,
  hiraganaMonographs,
} from "../library/hiragana";

interface TableCell {
  jp: string;
  en: string;
  exception?: boolean;
}

export interface Table {
  title: string;
  wide?: boolean;
  columns: string[];
  rows: { [index: string]: (TableCell | null)[] };
}

function generateTable(table: Table) {
  return (
    <div className={clsx("table", table.wide && "table--wide")}>
      <h3 className="table__title">{table.title}</h3>
      <div className="table__wrap">
        <div className="table__headers">
          {table.columns.map((col) => (
            <span key={col}>{col}</span>
          ))}
        </div>

        <>
          {Object.entries(table.rows).map(([key, value]) => {
            return (
              <div key={key} className="table__row">
                <span className="table__row__legend">{key}</span>

                {value.map((cell, i) => {
                  if (cell === null)
                    return <div key={key + i} className="cell cell--null" />;

                  return (
                    <div
                      key={key + i}
                      className={clsx(
                        "cell",
                        cell.exception && "cell--exception"
                      )}
                    >
                      <span className="jp">{cell.jp}</span>
                      <span className="en">{cell.en}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      </div>
    </div>
  );
}

export const HiraganaTable = () => {
  return (
    <>
      <div className="hiragana-tables">
        {generateTable(hiraganaMonographs)}
        {generateTable(hiraganaDigraphs)}
      </div>
      <div className="hiragana-tables">
        {generateTable(hiraganaDiacritics)}
        {generateTable(hiraganaDigraphsDiacritic)}
      </div>
    </>
  );
};
