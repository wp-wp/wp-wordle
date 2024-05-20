import React from "react";
import { KEYS } from "../constants";
import Key from "./Key";

function Keyboard({ onKeyPress, letterState }) {
  return (
    <div className="flex flex-col w-full items-center p-2">
      <div className="flex flex-col w-full gap-1">
        <div className="keyrow">
          {KEYS.slice(0, 10).map((letter) => {
            return (
              <Key
                key={letter}
                letter={letter.toUpperCase()}
                onKeyPress={onKeyPress}
                state={letterState[letter] ?? 'unsubmitted'}
              />
            );
          })}
        </div>
        <div className="keyrow">
          <div className="flex-[0.5]"> </div>
          {KEYS.slice(10, 19).map((letter) => {
            return (
              <Key
                key={letter}
                letter={letter.toUpperCase()}
                onKeyPress={onKeyPress}
                state={letterState[letter] ?? 'unsubmitted'}
              />
            );
          })}
          <div className="flex-[0.5]"> </div>
        </div>
        <div className="keyrow">
          <Key letter={"Enter"} onKeyPress={onKeyPress} />
          {KEYS.slice(19, 26).map((letter) => {
            return (
              <Key
                key={letter}
                letter={letter.toUpperCase()}
                onKeyPress={onKeyPress}
                state={letterState[letter] ?? 'unsubmitted'}
              />
            );
          })}
          <Key letter={"Backspace"} onKeyPress={onKeyPress} />
        </div>
      </div>
    </div>
  );
}




export default Keyboard;
