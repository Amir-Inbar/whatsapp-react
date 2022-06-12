import { useState } from "react";
import { useEffectUpdate } from "./useEffectUpdate";

export const useForm = (initialState, cb = () => {}) => {
  const [fields, setFields] = useState(initialState);

  useEffectUpdate(() => {
    cb(fields);
  }, [fields]);

  const handleChange = (ev, name) => {
    const { target } = ev;
    let value = "";
    if (ev.keyCode === 13 && ev.altKey) {
      setFields((prevFields) => ({
        ...prevFields,
        msg: (prevFields.msg += "/n"),
      }));
      console.log(fields);
      return;
    }
    const field = target.name || name;
    const key = ev.key === "Enter" ? "Enter" : "";
    if (target.value) {
      value = target.type === "number" ? +target.value || "" : target.value;
    } else value = target.type === "number" ? +target.innerText || "" : target.innerText;
    console.log(value);
    value = value.trim();
    setFields((prevFields) => ({ ...prevFields, [field]: value, key: key }));
  };

  const handleElChange = (ev, name) => {
    console.log('ev :>> ', ev);
    if (ev.keyCode === 13 && ev.altKey) {
      setFields((prevFields) => ({
        ...prevFields,
        msg: (prevFields.msg += " \n"),
      }));
      return;
    }
    let value = ev.target.innerHTML;
    console.log(value);
    const field = ev.target.name || name;
    const key = ev.key === "Enter" ? "Enter" : "";
    value = value.trim();
    setFields((prevFields) => ({ ...prevFields, [field]: value, key: key }));
  };

  return [fields, handleElChange, setFields];
};
