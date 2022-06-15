import { useState } from "react";
import { setCaret } from "../services/util.service";
import { useEffectUpdate } from "./useEffectUpdate";

export const useForm = (initialState, cb = () => {}) => {
  const [fields, setFields] = useState(initialState);

  useEffectUpdate(() => {
    cb(fields);
  }, [fields]);

  const handleElChange = (ev, name) => {
    if (ev.keyCode === 13 && ev.altKey) {
      ev.target.innerHTML += "\n\n";
      setCaret(ev.target);
      setFields((prevFields) => ({
        ...prevFields,
        msg: (prevFields.msg += "\r\n"),
      }));
      return;
    }
    let value = ev.target.innerHTML;
    const field = ev.target.name || name;
    const key = ev.key === "Enter" ? "Enter" : "";
    setFields((prevFields) => ({ ...prevFields, [field]: value, key: key }));
  };

  return [fields, handleElChange, setFields];
};
