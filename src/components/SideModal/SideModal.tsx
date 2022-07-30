import React, {useState } from "react";
//@ts-ignore
import { getImageUrl } from "../../services/util.service.js";
//@ts-ignore
import { eventBusService } from "../../services/eventBus.service.js";

interface prop {
  children: JSX.Element | undefined;
  key: string;
}

export const SideModal = (): JSX.Element | null => {
  const [transformX, setTransformX] = useState<string>("0");
  const [elMain, setElMain] = useState<prop | null>(null);

  eventBusService.on("setSideModal", (elTemplate: prop) => {
    setElMain(elTemplate);
    setTransformX("0");
  });

  eventBusService.on("setSelectedChat",()=> onClose())


  const onClose = () => {
    setTransformX("-100%");
  };

  return (
    <section
      className="side-modal flex column"
      style={{ transform: `translateX(${elMain?.children ? transformX : "-100%"})` }}
    >
      <header className="side-modal__header flex column justify-end">
        <div className="side-modal__header__close flex justify-start align-center">
          <img
            className="side-modal__header--img"
            src={getImageUrl("/icon/arrow-settings.svg")}
            alt="arrow"
            onClick={() => onClose()}
          />
          <span>{elMain?.key}</span>
        </div>
      </header>
      <main className="side-modal__main">{elMain?.children}</main>
    </section>
  );
};
