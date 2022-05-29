import {useEffect, useRef} from 'react'

const useClickInside = (handler) => {
  let domNodeRef = useRef(null);
  useEffect(() => {
    let maybeHandle = (event) => {
      if (domNodeRef.current.contains(event.target)) {
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

export default useClickInside