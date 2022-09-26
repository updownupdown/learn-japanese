import React, { useEffect, useState } from "react";
import { wordList } from "../library/wordList";
import "./Dictionary.scss";
import { Search } from "./Icons/Search";
import { toRomaji } from "wanakana";

export const Dictionary = () => {
  const [words, setWords] = useState<string[][]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageNum, setPageNum] = useState(0);

  const pageSize = 100;

  useEffect(() => {
    const results = wordList.filter((word) => {
      const consolidated = word[0] + word[1] + word[2];
      return consolidated.includes(search);
    });

    const resultsSize = results.length;
    const paginatedResults = results.slice(
      page * pageSize,
      (page + 1) * pageSize
    );

    setWords(paginatedResults);
    setPageNum(Math.ceil(resultsSize / pageSize));
  }, [page, search]);

  return (
    <div className="dictionary">
      <div className="dictionary__top">
        <div className="dictionary-search">
          <Search />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          className="button"
          onClick={() => {
            setPage(page - 1);
          }}
          disabled={page === 0}
        >
          Previous
        </button>
        <button
          className="button"
          onClick={() => {
            setPage(page + 1);
          }}
          disabled={page === pageNum - 1}
        >
          Next
        </button>
      </div>

      {words.length === 0 && (
        <div className="dictionary-no-results">
          <p>No results found.</p>
          <button
            className="button"
            onClick={() => {
              setSearch("");
            }}
          >
            Reset search
          </button>
        </div>
      )}

      <table className="dictionary__table">
        <tbody>
          {words.map((word) => {
            return (
              <tr key={word[0] + word[1] + word[2]}>
                <td className="dictionary-word__jp font-jp">
                  <div className="dictionary-word-breakup">
                    <span className="dictionary-word-breakup__hk">
                      {word[0]}
                    </span>
                    <span className="dictionary-word-breakup__kanji">
                      {word[1]}
                    </span>
                  </div>
                </td>
                <td className="dictionary-word__en">
                  <div className="dictionary-word-breakup">
                    <span className="dictionary-word-breakup__en">
                      {word[2]}
                    </span>
                    <span className="dictionary-word-breakup__romaji">
                      {toRomaji(word[0])}
                    </span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
