import { defineConfig } from "tsup";
 
export default defineConfig({
  entry: ["src/gh-pub.ts"],
  publicDir: false,
  clean: true,
  minify: true,
  format: ["cjs"], // 👈 Node
});