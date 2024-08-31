import React, { useState } from 'react';
import './TTT.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
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
        return squares[a];
      }
    }
    return null;
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

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((square, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)}>
            {square}
          </button>
        ))}
      </div>
      <button className="reset" onClick={() => setBoard(Array(9).fill(null))}>
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