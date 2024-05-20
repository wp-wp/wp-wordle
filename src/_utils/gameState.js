import { WORDS } from "../_data/words";

export const getWordle = (variable) => {
  const wordle = JSON.parse(localStorage.getItem("wordle"));
  switch (variable) {
    case "status":
      return wordle? wordle["status"] : "active";
      break;
    case "solution":
      return wordle
        ? wordle["solution"]
        : WORDS[Math.floor(Math.random() * WORDS.length)];
      break;
    case "stats":
      return wordle
        ? wordle["stats"]
        : {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
          };
      break;
    case "game":
      return wordle ? wordle["game"] : [];
      break;
  }
};

export const setWordle = (guesses, status, stats, solution) => {
  const gamestate = {
    status: status,
    stats: stats,
    game: guesses,
    solution: solution,
  };
  console.log(gamestate);
  return localStorage.setItem("wordle", JSON.stringify(gamestate));
};
