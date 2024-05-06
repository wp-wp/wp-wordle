import { WORDS } from "../_data/words";


export const getGameState = () => {
  const gameState = JSON.parse(localStorage.getItem("game"));
  if (!gameState) {
    return [];
  }
  return gameState;
};

export const getGameStatus = () => {
  const gameState = JSON.parse(localStorage.getItem("status"));
  if (!gameState) {
    return "active";
  }
  return gameState;
};

export const getGameStats = () => {
  const gameStats = JSON.parse(localStorage.getItem("stats"));
  if (!gameStats) {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
    };
  }
  return gameStats;
};

export const getGameSolution = () => {
  const solution = JSON.parse(localStorage.getItem("solution"));
  if (!solution) {
    return WORDS[Math.floor(Math.random()*WORDS.length)];
  }
  return solution;
};


export const setGameState = (guesses) => {
  return localStorage.setItem("game", JSON.stringify(guesses));
};

export const setGameStatus = (status) => {
  return localStorage.setItem("status", JSON.stringify(status));
};

export const setGameStats = (stats) => {
  return localStorage.setItem("stats", JSON.stringify(stats));
};
export const setGameSolution = (solution) => {
  return localStorage.setItem("solution", JSON.stringify(solution));
};

