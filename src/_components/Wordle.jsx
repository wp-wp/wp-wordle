import React, { useCallback, useEffect, useRef, useState } from "react";
import Row from "./Row";
import { GAME_ROUNDS, KEYS, WORD_LENGHT } from "../constants";
import Keyboard from "./Keyboard";
import { WORDS } from "../_data/words";
import { checkPosition } from "../_utils/positionCheck";
import {
  getGameState,
  getGameStats,
  getGameStatus,
  setGameState,
  setGameStats,
  setGameStatus,
} from "../_utils/gameState";

function Wordle({ solution }) {
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState(getGameState());
  const [game, setGame] = useState(getGameStatus());
  const [toast, setToast] = useState("");
  const [shake, setShake] = useState(false);
  const [stats, setStats] = useState(getGameStats());
  const toastTimeout = useRef();
  const shakeTimeout = useRef();

  const displayToast = (text) => {
    clearTimeout(toastTimeout.current);
    setToast(text);
    toastTimeout.current = setTimeout(() => {
      setToast("");
    }, 1500);
    return () => clearTimeout(toastTimeout.current);
  };

  const shakeRow = () => {
    clearTimeout(shakeTimeout.current);
    setShake(true);
    shakeTimeout.current = setTimeout(() => {
      setShake(false);
    }, 800);
    return () => clearTimeout(shakeTimeout.current);
  };

  const gameStats = (now) => {
    setStats(now);
    setGameStats(stats);
  };

  const playAgain = () => {
    setGame('active')
    setGameStatus("active");
    setGuess('')
    setGuesses([])
    setGameState([])
    console.log(WORDS[Math.floor(Math.random()*WORDS.length)])

    // to do
  }

  const hitEnter = useCallback(() => {
    let smallText = guess.toLowerCase();
    if (smallText.length !== WORD_LENGHT) {
      displayToast("Not enough letters");
      shakeRow();
      return;
    }
    if (!WORDS.includes(smallText)) {
      displayToast("Not in word list");
      return;
    }
    setGuesses([...guesses, smallText]);
    setGuess("");
    setGameState([...guesses, smallText]);
    if (smallText === solution) {
      setGame("won");
      setGameStatus("won");
      let statsNow = stats;
      statsNow["gamesPlayed"]++;
      statsNow["gamesWon"]++;
      gameStats(statsNow);     
      return;
    }
    if (guesses.length + 1 === GAME_ROUNDS) {
      setGame("lost");
      setGameStatus("lost");
      displayToast(solution);
      let statsNow = stats;
      statsNow["gamesPlayed"]++;
      statsNow["gamesLost"]++;
      gameStats(statsNow);
    }
  }, [guess, guesses, stats, gameStats]);
  const onKeyPress = useCallback(
    (key) => {
      if (game !== "active") {
        return;
      }
      if (key === "Backspace") {
        if (guess.length != 0) {
          setGuess(guess.substring(0, guess.length - 1));
        }
      } else if (key === "Enter") {
        hitEnter();
        return;
      } else {
        let smallText = key.toLowerCase();
        if (KEYS.includes(smallText)) {
          guess.length === WORD_LENGHT ? guess : setGuess(guess + key);
        }
      }
    },
    [setGuess, guess, guesses, stats, gameStats]
  );

  const onKeyboardPress = useCallback(
    (key) => {
      onKeyPress(key.key);
    },
    [setGuess, guess, guesses]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyboardPress);
    return () => window.removeEventListener("keydown", onKeyboardPress);
  }, [onKeyboardPress]);

  const positions = Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
    const isSubmited = idx < guesses.length;
    return checkPosition(solution, guesses[idx], isSubmited);
  });

  const letterState = {};
  positions.forEach((letter, idx) => {
    const guess = guesses[idx];
    if (!guess) {
      return;
    }
    letter.forEach((state, id) => {
      const letter = guess[id];
      if (letterState[letter] === "correct") {
        return;
      }
      if (state === "correct" || state[letter] === "correct") {
        letterState[letter] = "correct";
        return;
      } else if (state === "wrongPlace" || state[letter] === "wrongPlace") {
        letterState[letter] = "wrongPlace";
        return;
      } else if (
        state === "wrong" ||
        (state[letter] === "wrong" && letterState[letter] !== "wrongPlace")
      ) {
        letterState[letter] = "wrong";
        return;
      }
    });
  });

  return (
    <div className="w-full h-full flex justify-center">
      {game !== 'active' && (
        <div className="toast stats absolute font-semibold rounded-md bg-gray-600 z-50 p-6 top-52 flex flex-col gap-4">
        <div className="flex justify-between gap-4">
          <div className="p-2 flex flex-col gap-5 items-center">
            <div>PLAYED</div>
            <div className="text-2xl">{stats["gamesPlayed"]}</div>
          </div>
          <div className="p-2 flex flex-col gap-5 items-center">
            <div>WON</div>
            <div className="text-2xl">{stats["gamesWon"]}</div>
          </div>
          <div className="p-2 flex flex-col gap-5 items-center">
            <div>LOST</div>
            <div className="text-2xl">{stats["gamesLost"]}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button className="correct p-2 rounded-md" onClick={()=> playAgain()}>Play again</button>
        </div>
      </div>
      )}
      {toast && (
        <div className="absolute font-bold bg-white p-2 rounded-sm text-black m-2 toast z-40">
          {toast}
        </div>
      )}
      <div className=" w-full max-w-lg flex flex-col justify-between items-center py-10 max-h-[720px]">
        <div className="flex flex-col gap-2">
          {Array.from({ length: GAME_ROUNDS }).map((_, idx) => {
            return (
              <Row
                key={idx}
                word={idx === guesses.length ? guess : guesses[idx]}
                position={positions[idx]}
                shake={shake && idx === guesses.length}
                jump={game === 'won' && idx === guesses.length - 1 ? 'jump' : ''}
              />
            );
          })}
        </div>
        <Keyboard onKeyPress={onKeyPress} letterState={letterState} />
      </div>
    </div>
  );
}

export default Wordle;
