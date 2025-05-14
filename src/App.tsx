// src/App.tsx
import { useEffect, useState } from "react";
import type { Report } from "./types/report";
import "./App.css";

function App() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

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
