"use client";
import React, { useState } from 'react';
import './App.css';

const initialBoard = [
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
  ['', '', '', ''],
];

const AcrossClues = [
  '1. Pemrograman yang populer untuk pengembangan web.',
  '3. Bahasa yang digunakan untuk styling halaman web.',
  '5. Salah satu metode HTTP request.',
  '7. Library JavaScript untuk membangun antarmuka pengguna.',
];

const DownClues = [
  '2. Bahasa pemrograman yang digunakan untuk membuat halaman dinamis.',
  '4. Format data yang umum digunakan dalam pertukaran data.',
  '6. Alat untuk mengelola dependensi dalam proyek JavaScript.',
  '8. Bahasa scripting sisi server yang banyak digunakan.',
];

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [acrossAnswers, setAcrossAnswers] = useState(Array(AcrossClues.length).fill(''));
  const [downAnswers, setDownAnswers] = useState(Array(DownClues.length).fill(''));
  const [message, setMessage] = useState('');

  const handleInputChange = (event, row, col) => {
    const newBoard = [...board];
    newBoard[row][col] = event.target.value.toUpperCase();
    setBoard(newBoard);
  };

  const checkAnswers = () => {
    let correct = true;

    // Check Across Answers
    for (let i = 0; i < AcrossClues.length; i++) {
      if (acrossAnswers[i].toUpperCase() !== getAcrossWord(i).toUpperCase()) {
        correct = false;
        break;
      }
    }

    // Check Down Answers
    if (correct) {
      for (let i = 0; i < DownClues.length; i++) {
        if (downAnswers[i].toUpperCase() !== getDownWord(i).toUpperCase()) {
          correct = false;
          break;
        }
      }
    }

    setMessage(correct ? 'Jawaban benar!' : 'Jawaban salah.');
  };

  const getAcrossWord = (index) => {
    return AcrossClues[index].split('. ')[1];
  };

  const getDownWord = (index) => {
    return DownClues[index].split('. ')[1];
  };

  return (
    <div className="App">
      <h1>Teka-Teki Silang</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                className="cell"
                maxLength={1}
                value={cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="clues">
        <div className="across">
          <h2>Across</h2>
          {AcrossClues.map((clue, index) => (
            <div key={index}>
              <span>{clue}</span>
              <input
                type="text"
                maxLength={getAcrossWord(index).length}
                value={acrossAnswers[index]}
                onChange={(e) => {
                  const newAnswers = [...acrossAnswers];
                  newAnswers[index] = e.target.value.toUpperCase();
                  setAcrossAnswers(newAnswers);
                }}
              />
            </div>
          ))}
        </div>
        <div className="down">
          <h2>Down</h2>
          {DownClues.map((clue, index) => (
            <div key={index}>
              <span>{clue}</span>
              <input
                type="text"
                maxLength={getDownWord(index).length}
                value={downAnswers[index]}
                onChange={(e) => {
                  const newAnswers = [...downAnswers];
                  newAnswers[index] = e.target.value.toUpperCase();
                  setDownAnswers(newAnswers);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={checkAnswers}>Cek Jawaban</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
