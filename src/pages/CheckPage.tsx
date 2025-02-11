// src/pages/CheckPage.tsx
import React, { useState } from "react";
import { useWordsContext } from "../store/WordsContext";
import { FlashCard } from "../components/FlashCard";
import { Word } from "../types";

export const CheckPage: React.FC = () => {
  const { state, dispatch } = useWordsContext();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  // 未知単語リストを取得
  const unknownWords = state.words.filter((w) => w.unknowCnt > 0);

  const getRandomUnknown = () => {
    if (unknownWords.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * unknownWords.length);
    return unknownWords[randomIndex];
  };

  React.useEffect(() => {
    setCurrentWord(getRandomUnknown());
  }, [state.words]);

  const showNextCard = () => {
    setCurrentWord(getRandomUnknown());
  };

  const handleKnown = () => {
    if (!currentWord) return;
    // 覚えた → unknowCnt=0にする
    dispatch({ type: "RESET_UNKNOW", payload: { id: currentWord.id } });
    showNextCard();
  };

  const handleUnknown = () => {
    // まだ知らない → そのまま or unknowCnt++
    if (!currentWord) return;
    // dispatch({ type: "INCREMENT_UNKNOW", payload: { id: currentWord.id } });
    // showNextCard();
    // ここでは simply next するのみ
    showNextCard();
  };

  if (unknownWords.length === 0) {
    return (
      <div style={{ marginTop: 80, textAlign: "center" }}>
        <h3>チェック対象の単語はありません。</h3>
        <p>「知らない」単語があるとここに表示されます。</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 80, textAlign: "center" }}>
      <h2>チェックモード</h2>
      {currentWord && (
        <FlashCard word={currentWord} onKnow={handleKnown} onUnknow={handleUnknown} />
      )}
    </div>
  );
};
