import React, { useEffect, useState, useLayoutEffect } from "react";
import { getImageUrl } from "../services/util.service";

export const DefaultMsg = () => {
  return (
    <div className="default-msg flex column full-grow justify-center align-center">
      <img src={getImageUrl("/img/background-nochat.jpg")} alt="" />
      <div className="msg-explanation">
        <h1>Keep your phone connected</h1>
        <p>
          WhatsApp connects to your phone to sync messages. To reduce data
          usage, connect your phone to Wi-Fi.
        </p>
        <hr />
        <p>Make calls from desktop with WhatsApp for Windows. Get it here</p>
      </div>
    </div>
  );
};
