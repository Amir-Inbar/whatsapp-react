import React, { useState } from "react";
//@ts-ignore
import { getImageUrl } from "../../services/util.service.js";
interface SettingsModalProps {
  children: React.ReactNode[];
}

export const OverLayModal = (props: SettingsModalProps): JSX.Element | null => {
  const [transformX, setTransformX] = useState<string>("0");
  const getChildByKey = (key: string): React.ReactNode => {
    // return props?.children.find((child: JSX.Element) => child?.key === key);
    return null;
  };

  const onClose = () => {
    setTransformX("-100%");
  };

  return (
    <section className="overlay-modal flex column" style={{ transform: `translateX(${transformX})` }}>
      <header className="overlay-modal__header flex column justify-end">
        <img
          className="overlay-modal__header__img"
          src={getImageUrl("/icon/arrow-settings.svg")}
          alt="arrow"
          onClick={() => onClose()}
        />
        {getChildByKey("header")}
      </header>
      <main className="overlay-modal__main">{getChildByKey("main")}</main>
    </section>
  );
};
