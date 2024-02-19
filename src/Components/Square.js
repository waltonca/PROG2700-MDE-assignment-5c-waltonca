import React from 'react';

function Square({ value, onSquareClick, isWinningSquare }) {
  const squareStyle = isWinningSquare ? { backgroundColor: 'yellow' } : {};

  return (
    <button className="square" onClick={onSquareClick} style={squareStyle}>
      {value}
    </button>
  );
}

export default Square;
