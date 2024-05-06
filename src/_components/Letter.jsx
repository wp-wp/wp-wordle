import React, { useState, useEffect } from "react";

function Letter({ singleLetter, position, flip, idx, jump }) {
  const [color, changeColor]= useState(false)

  useEffect(() => {
    let timeout;
    if (position !== '') {
      timeout = setTimeout(() => {
        changeColor(true);
      }, idx*100 + 300);
    }
    return () => clearTimeout(timeout);
  }, [position]);

  let className = position && color ? "letterStyle letter " + position : "letter border-gray-500/50"
  flip && position !=="" ? (className = className + ' flip') : className
  jump === 'jump' && (className = "letterStyle letter " + position + ' jump')
  return (
    <div
      className={className}
      style = {{
        animationDelay: position === "" ? '0ms' : `${idx*100}ms`}}
    >
      {singleLetter}
    </div>
  );
}

export default Letter;
