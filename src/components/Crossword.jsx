"use client";
import React, { useState } from 'react';
import './Crossword.css';

const Crossword = () => {
  const [horizontalAnswers, setHorizontalAnswers] = useState(['apple', 'banana', 'grape', 'orange']);
  const [verticalAnswers, setVerticalAnswers] = useState(['apricot', 'kiwi', 'mango', 'pear']);

  const [board, setBoard] = useState(
    Array.from({ length: 5 }, () => Array(5).fill({ value: '', correct: null }))
  );

  const handleInputChange = (e, row, col) => {
    const inputValue = e.target.value.toUpperCase();
    const isHorizontal = e.target.dataset.direction === 'horizontal';

    const isCorrect =
      (isHorizontal && horizontalAnswers[row] && inputValue === horizontalAnswers[row].charAt(col)) ||
      (!isHorizontal && verticalAnswers[col] && inputValue === verticalAnswers[col].charAt(row));

    const newBoard = [...board];
    newBoard[row][col] = { value: inputValue, correct: isCorrect };
    setBoard(newBoard);
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="crossword-row">
        {row.map((cell, colIndex) => (
          <input
            key={colIndex}
            type="text"
            className={`crossword-cell ${cell.correct !== null ? (cell.correct ? 'correct' : 'incorrect') : ''}`}
            value={cell.value}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            data-direction={colIndex === 0 ? 'horizontal' : 'vertical'}
            readOnly={cell.correct !== null}
          />
        ))}
      </div>
    ));
  };

  return (
    <div className="crossword-container">
      <h2>Crossword Game</h2>
      {renderBoard()}
    </div>
  );
};

export default Crossword;
