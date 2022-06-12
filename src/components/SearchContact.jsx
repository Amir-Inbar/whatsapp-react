import React, { useState } from "react";
import { getImageUrl } from "../services/util.service";

export const SearchContact = () => {
  const [isSearching, setIsSearching] = useState(false);

  const toggleBtn = () => {
    return isSearching ? "arrow" : "search";
  };

  return (
    <div className="search-section">
      <div className="search-contact flex align-center justify-center">
        <img
          src={getImageUrl(`/icon/${toggleBtn()}.svg`)}
          onClick={() => setIsSearching(!isSearching)}
          className={toggleBtn()}
        />
        <input type="text" placeholder="Search or start new chat" className="full-grow" />
      </div>
    </div>
  );
};
