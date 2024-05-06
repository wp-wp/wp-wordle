import { WORD_LENGHT } from "../constants";

export function checkRepeats(word) {
    let obj = {}
    for(let x = 0, length = word.length; x < length; x++) {
      var l = word.charAt(x)
      obj[l] = (isNaN(obj[l]) ? 1 : obj[l] + 1);
  }
    return obj;
  }
export const checkPosition = (solution, word, isSubmited) => {
    let positions = [...Array(WORD_LENGHT)].fill("");
    if (!isSubmited || !word) {
      return positions;
    }
    let repeats = checkRepeats(solution)
    for (let i = 0; i < solution.length; i++) {      
      if (word[i] === solution[i]) {
        positions[i] = "correct";
        repeats[word[i]]-=1
      }
    }
    for (let i = 0; i < solution.length; i++) {      
      if (positions[i]!== 'correct'){
        if (solution.includes(word[i]) && repeats[word[i]] !== 0) {
          positions[i]="wrongPlace"
          repeats[word[i]]-=1
        } else {
          positions[i] = "wrong";
        }
      }
    }
    
    return positions;
  };