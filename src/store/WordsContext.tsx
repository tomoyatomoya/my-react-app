// src/store/WordsContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Word } from "../types";
import { v4 as uuidv4 } from "uuid";

type WordsState = {
  words: Word[];
};

type WordsAction =
  | { type: "ADD_WORD"; payload: { term: string; detail: string } }
  | { type: "UPDATE_WORD"; payload: Word }
  | { type: "DELETE_WORD"; payload: { id: string } }
  | { type: "INCREMENT_KNOW"; payload: { id: string } }
  | { type: "INCREMENT_UNKNOW"; payload: { id: string } }
  | { type: "RESET_UNKNOW"; payload: { id: string } }
  | { type: "SET_WORDS"; payload: Word[] };

function wordsReducer(state: WordsState, action: WordsAction): WordsState {
  switch (action.type) {
    case "SET_WORDS":
      return { words: action.payload };

    case "ADD_WORD": {
      const newWord: Word = {
        id: uuidv4(),
        term: action.payload.term,
        detail: action.payload.detail,
        knowCnt: 0,
        unknowCnt: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { words: [...state.words, newWord] };
    }

    case "UPDATE_WORD": {
      const updatedWord = {
        ...action.payload,
        updatedAt: new Date().toISOString(),
      };
      const newWords = state.words.map((w) =>
        w.id === updatedWord.id ? updatedWord : w
      );
      return { words: newWords };
    }

    case "DELETE_WORD": {
      const newWords = state.words.filter((w) => w.id !== action.payload.id);
      return { words: newWords };
    }

    case "INCREMENT_KNOW": {
      const newWords = state.words.map((w) =>
        w.id === action.payload.id
          ? { ...w, knowCnt: w.knowCnt + 1, updatedAt: new Date().toISOString() }
          : w
      );
      return { words: newWords };
    }

    case "INCREMENT_UNKNOW": {
      const newWords = state.words.map((w) =>
        w.id === action.payload.id
          ? {
              ...w,
              unknowCnt: w.unknowCnt + 1,
              updatedAt: new Date().toISOString(),
            }
          : w
      );
      return { words: newWords };
    }

    case "RESET_UNKNOW": {
      const newWords = state.words.map((w) =>
        w.id === action.payload.id
          ? { ...w, unknowCnt: 0, updatedAt: new Date().toISOString() }
          : w
      );
      return { words: newWords };
    }

    default:
      return state;
  }
}

const initialState: WordsState = {
  words: [],
};

const WordsContext = createContext<{
  state: WordsState;
  dispatch: React.Dispatch<WordsAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export const WordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(wordsReducer, initialState);

  // 初回マウント時にlocalStorageから読み込む
  useEffect(() => {
    const storedData = localStorage.getItem("myWords");
    if (storedData) {
      const parsed = JSON.parse(storedData) as Word[];
      dispatch({ type: "SET_WORDS", payload: parsed });
    }
  }, []);

  // stateが更新されるたびにlocalStorageへ保存
  useEffect(() => {
    localStorage.setItem("myWords", JSON.stringify(state.words));
  }, [state.words]);

  return (
    <WordsContext.Provider value={{ state, dispatch }}>
      {children}
    </WordsContext.Provider>
  );
};

export const useWordsContext = () => useContext(WordsContext);
