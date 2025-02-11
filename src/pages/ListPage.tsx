// src/pages/ListPage.tsx
import React, { useState } from "react";
import { useWordsContext } from "../store/WordsContext";
import { WordListItem } from "../components/WordListItem";
import { WordFormModal } from "../components/WordFormModal";

export const ListPage: React.FC = () => {
  const { state, dispatch } = useWordsContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editWord, setEditWord] = useState<any>(null);

  const handleAddClick = () => {
    setEditWord(null); // 新規
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data: { term: string; detail: string }, editId?: string) => {
    if (editId) {
      // 編集
      dispatch({
        type: "UPDATE_WORD",
        payload: {
          id: editId,
          term: data.term,
          detail: data.detail,
          knowCnt: 0, // 既存値を保持するなら既存を参照する形に修正
          unknowCnt: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      });
    } else {
      // 新規追加
      dispatch({
        type: "ADD_WORD",
        payload: {
          term: data.term,
          detail: data.detail,
        },
      });
    }
  };

  const handleEdit = (wordToEdit: any) => {
    setEditWord(wordToEdit);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: "DELETE_WORD", payload: { id } });
  };

  return (
    <div style={{ marginTop: 80 }}>
      <div style={{ textAlign: "center" }}>
        <h2>単語リスト</h2>
        <button onClick={handleAddClick}>＋ 新規追加</button>
      </div>
      <div style={{ marginTop: 20 }}>
        {state.words.map((w) => (
          <WordListItem
            key={w.id}
            word={w}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <WordFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        editWord={editWord}
      />
    </div>
  );
};
