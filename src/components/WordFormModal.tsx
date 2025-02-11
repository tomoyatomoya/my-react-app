// src/components/WordFormModal.tsx
import React, { useState, useEffect } from "react";
import { Word } from "../types";
import "./WordFormModal.css";

type WordFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { term: string; detail: string }, editId?: string) => void;
  editWord?: Word; // 編集時は既存データを受け取る
};

export const WordFormModal: React.FC<WordFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editWord,
}) => {
  const [term, setTerm] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    if (editWord) {
      setTerm(editWord.term);
      setDetail(editWord.detail);
    } else {
      setTerm("");
      setDetail("");
    }
  }, [editWord]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({ term, detail }, editWord?.id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="word-form-modal">
        <h2>{editWord ? "単語を編集" : "単語を追加"}</h2>
        <div className="form-group">
          <label>単語:</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>詳細:</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button onClick={handleSubmit}>{editWord ? "保存" : "作成"}</button>
          <button onClick={onClose}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};
