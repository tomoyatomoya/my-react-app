// src/components/TabBar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./TabBar.css"; // 任意のスタイルシート

export const TabBar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="tab-bar">
      <Link
        to="/learn"
        className={location.pathname === "/learn" ? "active" : ""}
      >
        学習
      </Link>
      <Link to="/list" className={location.pathname === "/list" ? "active" : ""}>
        リスト
      </Link>
      <Link
        to="/check"
        className={location.pathname === "/check" ? "active" : ""}
      >
        チェック
      </Link>
    </div>
  );
};
