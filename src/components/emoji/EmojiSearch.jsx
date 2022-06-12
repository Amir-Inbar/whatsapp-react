import React, { useEffect, useState, useLayoutEffect } from "react";

export const EmojiSearch = () => {
  return (
    <div className="emoji-search">
      <div className="search">
        <input type="text" placeholder="Search Emoji" />
      </div>
    </div>
  );
};
