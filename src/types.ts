// src/types.ts

export type Word = {
    id: string;
    term: string;     // 単語
    detail: string;   // 詳細（訳など）
    knowCnt: number;  // 「知っている」の回数
    unknowCnt: number; // 「知らない」の回数
    createdAt: string;
    updatedAt: string;
  };
  