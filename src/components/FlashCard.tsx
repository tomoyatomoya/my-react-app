// src/components/FlashCard.tsx
import React, { useState } from "react";
import { Word } from "../types";
import "./FlashCard.css";

type FlashCardProps = {
  word: Word;
  onKnow: () => void;
  onUnknow: () => void;
};

export const FlashCard: React.FC<FlashCardProps> = ({ word, onKnow, onUnknow }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // 簡易実装：左右スワイプはイベントの詳細実装を省略
  // 実際はonTouchStart / onTouchMove / onTouchEndなどで判定
  // ここでは代わりに、左上/右上のボタンで疑似的に操作例を示す
  const handleKnow = () => {
    onKnow();
  };

  const handleUnknow = () => {
    onUnknow();
  };

  return (
    <div className="flash-card-container">
      <div className={`flash-card ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
        <div className="flash-card-front">
          <h2>{word.term}</h2>
          <p>タップで裏返し</p>
        </div>
        <div className="flash-card-back">
          <p>{word.detail}</p>
          <p>タップで表に戻る</p>
        </div>
      </div>
      <div className="flash-card-actions">
        <button onClick={handleUnknow}>知らない</button>
        <button onClick={handleKnow}>知ってる</button>
      </div>
    </div>
  );
};
