import React, { useEffect, useState } from "react";

export const AddContact = () => {
  const addChat = (ev:Event) => {
    ev.preventDefault();
  };
  
  return (
    <section className="add-contact flex column">
     <div className="chat-preview" style={{}}>New Group</div>
    </section>
  );
};
