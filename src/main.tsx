import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // ← `import { App }` → `import App` に修正
import { WordsProvider } from "./store/WordsContext";
import "./index.css"; // グローバルCSS

console.log("✅ main.tsx is loaded!"); // ← デバッグ用ログ

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WordsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WordsProvider>
  </React.StrictMode>
);
