import classNames from "classnames";
import React, { useState, useEffect } from "react";
import css from "./Letter.module.css";

function Letter({ singleLetter, position, flip, idx, jump }) {
  const [color, changeColor] = useState(false);

  useEffect(() => {
    let timeout;
    if (position !== "") {
      timeout = setTimeout(() => {
        changeColor(true);
      }, idx * 100 + 300);
    }
    return () => clearTimeout(timeout);
  }, [position]);

  
  return (
    <div
      style={{
        animationDelay: position === "" ? "0ms" : `${idx * 100}ms`,
      }}
      className={classNames("w-16 h-16 border-2 flex justify-center uppercase items-center font-bold text-3xl", {
        "border-gray-300/50": position === "" && !singleLetter,
        [css.letterStyle]: !!singleLetter,
        [css.correct]: position === "correct" && changeColor,
        [css.wrong]: position === "wrong" && changeColor,
        [css.wrongPlace]: position === "wrongPlace" && changeColor,
        [css.flip]: flip && position !== "",
        [css.jump]: jump,
      })}
    >
      {singleLetter}
    </div>
  );
}

export default Letter;
