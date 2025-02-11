import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages の URL に合わせて `base` を設定
export default defineConfig({
  plugins: [react()],
  base: "/my-word-app/", // ← ここをリポジトリ名に変更！
});
