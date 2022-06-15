import { useRef,useEffect } from "react";

export const useOutsideClick = (outSideCb,insideCb) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (ev) => {
      ref.current && !ref.current.contains(ev.target)
        ? outSideCb(ev)
        : outSideCb(ev);
    };
    document.addEventListener("click", handleClick, true);
    
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref]);

  return ref;
};
