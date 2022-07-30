import React, { useEffect, useState } from "react";

export const AddContact = () => {
  const addChat = (ev) => {
    ev.preventDefault();
  };
  return (
    <section className="add-contact flex column">
     <div className="chat-preview">New Group</div>
    </section>
  );
};
