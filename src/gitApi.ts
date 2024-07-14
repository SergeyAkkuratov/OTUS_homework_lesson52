import { OptionValues } from "commander";
import fs from "fs"
import { execSync } from "node:child_process"

export default function publish(options: OptionValues){
  try {
    execSync(`git clone ${options.repository} ./temp123`);
    execSync(`git checkout ${options.branch}`, { cwd: "./temp123" });
  
    fs.cpSync(options.deploy, "./temp123", { recursive: true });
  
    execSync(`git add .`, { cwd: "./temp123" });
    execSync(`git commit -m "GitHub Pages deploy"`, { cwd: "./temp123" });
    execSync(`git push`, { cwd: "./temp123" });
  } catch (error) {
    console.log(error);
  } finally {
    fs.rmSync("./temp123", { recursive: true, force: true })
  }
}
