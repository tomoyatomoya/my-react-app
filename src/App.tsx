import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LearnPage } from "./pages/LearnPage";
import { ListPage } from "./pages/ListPage";
import { CheckPage } from "./pages/CheckPage";
import { TabBar } from "./components/TabBar";

console.log("✅ App.tsx is loaded!"); // ← デバッグ用ログ

const App: React.FC = () => {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <Routes>
        <Route path="/" element={<Navigate to="/learn" />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/check" element={<CheckPage />} />
      </Routes>
      <TabBar />
    </div>
  );
};

export default App; // ← デフォルトエクスポートにする

