// src/components/WordListItem.tsx
import React, { useState } from "react";
import { Word } from "../types";
import "./WordListItem.css";

type WordListItemProps = {
  word: Word;
  onEdit: (word: Word) => void;
  onDelete: (id: string) => void;
};

export const WordListItem: React.FC<WordListItemProps> = ({
  word,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleItemClick = () => {
    setShowMenu(!showMenu);
  };

  const handleEditClick = () => {
    onEdit(word);
    setShowMenu(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm("削除してよろしいですか？")) {
      onDelete(word.id);
    }
    setShowMenu(false);
  };

  return (
    <div className="word-list-item">
      <div className="word-list-item-main" onClick={handleItemClick}>
        <span className="term">{word.term}</span>
        <span className="arrow">{showMenu ? "▲" : "▼"}</span>
      </div>
      {showMenu && (
        <div className="word-list-item-menu">
          <button onClick={handleEditClick}>編集</button>
          <button onClick={handleDeleteClick}>削除</button>
        </div>
      )}
    </div>
  );
};
