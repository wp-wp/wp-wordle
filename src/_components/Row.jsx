import React, { useCallback } from "react";
import Letter from "./Letter";
import { WORD_LENGHT } from "../constants";


function Row({ word, position, shake , jump}) {
  return (
    <div className={"flex gap-2 "+ (shake ? 'shake' : '')}>
      {Array.from({ length: WORD_LENGHT }).map((_, idx) => {
        return (
          <Letter
            key={idx}
            idx={idx}
            singleLetter={word ? word[idx] : ""}
            position={position ? position[idx] : ""}
            flip={true}
            jump={jump}
          />
        );
      })}
    </div>
  );
}

export default Row;
