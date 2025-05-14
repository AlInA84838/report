// src/App.tsx
import { useEffect, useState } from "react";
import type { Report } from "./types/report";
import "./App.css";
import Modal from "./components/Modal/Modal";

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleCheck = () => {
    const hardcodedPassword = "0508";
    setIsValid(input === hardcodedPassword);
  };

  useEffect(() => {
    fetch("https://6824f2690f0188d7e72b8198.mockapi.io/report/report")
      .then((res) => res.json())
      .then((data) => {
        setReports(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Загрузка...</p>;

  return (
    <div className="App">
      <button
        style={{
          backgroundColor: "#4caf50",
          border: "none",
          borderRadius: "8px",
          padding: "10px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          position: "fixed",
          right: "20px",
        }}
        onClick={handleOpenModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 5v14M5 12h14"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <Modal
        isOpen={modal}
        onClose={() => {
          setModal(false);
        }}
      >
        <input
          type="password"
          placeholder="Введите пароль"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleCheck}>Войти</button>
        {isValid !== null && <p>{!isValid && "❌ Неверный пароль"}</p>}
        {isValid && (
          <div>
            <input
              type="date"
              placeholder="Дата"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              type="time"
              placeholder="Время"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {"-"}
            <input
              type="time"
              placeholder="Время"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        )}
      </Modal>

      <h1>🗓️ Отчёты по дням</h1>
      {reports.map((report) => (
        <div className="report-card" key={report.id}>
          <div className="report-date">{report.date}</div>
          {report.entries.map((entry, i) => (
            <div key={i}>
              <div className="entry-time">{entry.time}</div>
              <ul>
                {entry.tasks.map((task, j) => (
                  <li key={j}>{task}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
