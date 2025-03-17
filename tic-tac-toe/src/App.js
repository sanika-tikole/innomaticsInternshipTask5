import React, { useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import { StartOver } from "./components/StartOver"; // Added StartOver import
import './App.css';

const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) =>
      idx === boxIdx ? (xPlaying ? "X" : "O") : value
    );

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        setScores({ ...scores, oScore: oScore + 1 });
      } else {
        let { xScore } = scores;
        setScores({ ...scores, xScore: xScore + 1 });
      }
    }

    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  const startOver = () => {
    setScores({ xScore: 0, oScore: 0 }); // Reset scores
    resetBoard(); // Clear the board as well
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <StartOver startOver={startOver} /> {/* Added StartOver Button */}
    </div>
  );
};

export default App;
