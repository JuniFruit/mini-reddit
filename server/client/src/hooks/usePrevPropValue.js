import { useEffect, useRef } from "react";

/**
 * Returns value that was given on the last render
  @param value value to return 
   
 */

export const usePrevPropValue = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }