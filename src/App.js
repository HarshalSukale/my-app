import React, { useState, useEffect } from 'react';
import './TTT.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winningSquares, setWinningSquares] = useState([]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const result = calculateWinner(newBoard);
    if (result) {
      if (result.winner === 'X') {
        return -10 + depth;
      } else if (result.winner === 'O') {
        return 10 - depth;
      }
      return 0;
    }

    if (newBoard.every(square => square !== null)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'O';
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newBoard.length; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'X';
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    handleClick(move);
  };

  const handleClick = (index) => {
    const squares = board.slice();
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    squares[index] = isXNext ? 'X' : 'O';
    setBoard(squares);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinningSquares(result.line);
    } else if (!isXNext) {
      bestMove(); // AI move
    }
  }, [board, isXNext]);

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner.winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, index) => (
          <button
            key={index}
            className={`square ${winningSquares.includes(index) ? 'highlight' : ''}`}
            onClick={() => handleClick(index)}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset" onClick={() => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setWinningSquares([]);
      }}>
        Reset Game
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <TicTacToe />
    </div>
  );
};

export default App;
