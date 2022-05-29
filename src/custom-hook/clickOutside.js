import { useEffect, useRef } from "react";
import React from 'react'

let useClickOutside = (handler) => {
  let domNodeRef = useRef(null);
  useEffect(() => {
    let maybeHandle = (event) => {
      if (!domNodeRef.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandle);
    return () => {
      document.removeEventListener("mousedown", maybeHandle);
    };
  }, []);
  return domNodeRef;
};

export default useClickOutside


