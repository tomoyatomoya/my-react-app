// src/pages/LearnPage.tsx
import React, { useState } from "react";
import { useWordsContext } from "../store/WordsContext";
import { FlashCard } from "../components/FlashCard";
import { Word } from "../types";

export const LearnPage: React.FC = () => {
  const { state, dispatch } = useWordsContext();
  const [currentWord, setCurrentWord] = useState<Word | null>(null);

  // ランダムに1件取得する簡易関数
  const getRandomWord = () => {
    if (state.words.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * state.words.length);
    return state.words[randomIndex];
  };

  // ページ初期 or カードを切り替えたいときに呼ぶ
  const showNextCard = () => {
    const word = getRandomWord();
    setCurrentWord(word);
  };

  React.useEffect(() => {
    showNextCard();
  }, [state.words]);

  const handleKnow = () => {
    if (!currentWord) return;
    dispatch({ type: "INCREMENT_KNOW", payload: { id: currentWord.id } });
    showNextCard();
  };

  const handleUnknow = () => {
    if (!currentWord) return;
    dispatch({ type: "INCREMENT_UNKNOW", payload: { id: currentWord.id } });
    showNextCard();
  };

  if (state.words.length === 0) {
    return (
      <div style={{ marginTop: 80, textAlign: "center" }}>
        <h3>単語が登録されていません</h3>
        <p>リスト画面から単語を追加してください。</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: 80, textAlign: "center" }}>
      <h2>学習ページ</h2>
      {currentWord && (
        <FlashCard word={currentWord} onKnow={handleKnow} onUnknow={handleUnknow} />
      )}
    </div>
  );
};
