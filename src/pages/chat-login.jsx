import React, { useEffect, useState, useLayoutEffect } from "react";
import { getImageUrl } from "../services/util.service";
import QRCode from "qrcode";
export const ChatLogin = () => {
  const [qrCode, setQrcode] = useState(null);

  const GenerateQR = async (text) => {
      const opts = {
          version:7,
          maskPattern:5,
          margin:1,
      }
    try {
      const imgToDataUrl = await QRCode.toDataURL(text,opts);
      setQrcode(imgToDataUrl);
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  GenerateQR("www.google.com");

  return (
    <div className="chat-login flex column full-grow ">
      <div className="landing-page-header flex ">
        <img src={getImageUrl("/icon/logo.svg")} alt="" />
        <span>WHATSAPP WEB</span>
      </div>
      <div className="landing-page">
        <div className="landing-window flex">
          <div className="instructions">
            <p>To use WhatsApp on your computer:</p>
            <ol>
              <li>Open WhatsApp on your phone</li>
              <li>
                Tap <strong>Menu</strong>
                <img src={getImageUrl("/icon/settings.svg")} alt="" /> or
                <strong> Settings</strong>{" "}
                <img src={getImageUrl("/icon/settings1.svg")} alt="" /> and
                select <strong>Linked Devices</strong>
              </li>
              <li>
                Tap on <strong>Link a Device</strong>
              </li>
              <li>Point your phone to this screen to capture the code</li>
            </ol>
            <div className="help-to-start">Need help to get started?</div>
          </div>
          <div className="qr-code">
            <img src={qrCode} alt="" />
          </div>
        </div>
        <div className="app-guide"></div>
      </div>
    </div>
  );
};
// the server know me and the array of chats and he send the users from there.
