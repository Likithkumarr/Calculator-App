import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [dark, setDark] = useState(true);

  // Load from localStorage
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    const savedTheme = JSON.parse(localStorage.getItem("theme"));

    setHistory(savedHistory);

    if (savedTheme !== null) {
      setDark(savedTheme);
      document.body.className = savedTheme ? "dark" : "light";
    }
  }, []);

  // Save history
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // Theme toggle
  const toggleTheme = () => {
    const newTheme = !dark;
    setDark(newTheme);
    localStorage.setItem("theme", JSON.stringify(newTheme));
    document.body.className = newTheme ? "dark" : "light";
  };

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");

  const handleDelete = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const result = evaluate(input);
      const newHistory = [...history, `${input} = ${result}`];
      setHistory(newHistory);
      setInput(result.toString());
    } catch {
      setInput("Error");
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!isNaN(e.key)) handleClick(e.key);
      if (["+", "-", "*", "/", ".", "(", ")"].includes(e.key))
        handleClick(e.key);
      if (e.key === "Enter") handleCalculate();
      if (e.key === "Backspace") handleDelete();
      if (e.key === "Escape") handleClear();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="calculator">
      <h2 className="app-title">🧠 LK CalcNova</h2>
      {/* Theme toggle */}
      <button className="theme-btn" onClick={toggleTheme}>
        {dark ? "🌙 Dark" : "☀️ Light"}
      </button>

      <input value={input} readOnly />

      {/* History */}
      <div className="history">
        {history.slice(-5).map((h, i) => (
          <p key={i}>{h}</p>
        ))}
      </div>

      <div className="buttons">
        <button onClick={handleClear}>C</button>
        <button onClick={handleDelete}>⌫</button>
        <button onClick={() => handleClick("(")}>(</button>
        <button onClick={() => handleClick(")")}>)</button>

        <button onClick={() => handleClick("sin(")}>sin</button>
        <button onClick={() => handleClick("cos(")}>cos</button>
        <button onClick={() => handleClick("tan(")}>tan</button>
        <button onClick={() => handleClick("sqrt(")}>√</button>

        <button onClick={() => handleClick("log(")}>log</button>
        <button onClick={() => handleClick("^2")}>x²</button>
        <button onClick={() => handleClick("^")}>xʸ</button>
        <button onClick={() => handleClick("/")}>/</button>

        <button onClick={() => handleClick("7")}>7</button>
        <button onClick={() => handleClick("8")}>8</button>
        <button onClick={() => handleClick("9")}>9</button>
        <button onClick={() => handleClick("*")}>×</button>

        <button onClick={() => handleClick("4")}>4</button>
        <button onClick={() => handleClick("5")}>5</button>
        <button onClick={() => handleClick("6")}>6</button>
        <button onClick={() => handleClick("-")}>-</button>

        <button onClick={() => handleClick("1")}>1</button>
        <button onClick={() => handleClick("2")}>2</button>
        <button onClick={() => handleClick("3")}>3</button>
        <button onClick={() => handleClick("+")}>+</button>

        <button onClick={() => handleClick("0")}>0</button>
        <button onClick={() => handleClick(".")}>.</button>

        <button className="equal" onClick={handleCalculate}>
          =
        </button>
      </div>
    </div>
  );
}